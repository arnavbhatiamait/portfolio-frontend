import { NextResponse } from "next/server";

type ChatMessage = {
  role?: string;
  content?: string;
};

type GeminiContent = {
  role: "user" | "model";
  parts: Array<{ text: string }>;
};

const OFFLINE_CHAT_RESPONSES: Record<string, string> = {
  nyaay:
    "**NYAAY AI** is an event-driven legal document question-answering system I built during my internship at PAN Science Innovations.\n\n" +
    "Key highlights:\n" +
    "- Decoupled ingestion using S3 notifications, SQS message queues, and EC2 workers.\n" +
    "- Semantic legal-aware chunking with custom RecursiveCharacterTextSplitter separators.\n" +
    "- Cosine similarity searching in PostgreSQL via pgvector and keyword ranking (ts_rank) combined via Reciprocal Rank Fusion (RRF).",
  council:
    "**Council** is a B2B publishing ERP and CRM platform. The production deployment is live at **[council.panscience.ai](https://council.panscience.ai)**.\n\n" +
    "I was solely responsible for designing the normalized PostgreSQL database schemas, building the Express/Node backend APIs, and coding the Next.js/React frontend. It features warehouse inventory stock triggers and contract territory rights mapping.",
  voice:
    "The **Real-Time AI Voice Calling Agent** is a full-telephony Generative AI integration.\n\n" +
    "It connects Twilio Voice APIs over bidirectional WebSockets to stream raw, base64 audio. It features streaming Whisper/Deepgram STT (sub-300ms latency), LangChain prompt orchestration, and streaming ElevenLabs TTS. I built a custom server-side barge-in handler to flush output buffers when the user interrupts.",
  opticall:
    "**Opticall** is an audio analytics and intelligence engine parsing call center recordings. " +
    "It utilizes pyannote/diarization models to segment audio tracks into agent/customer timestamps, calculates Talk-to-Listen ratios, detects dead-air silences, and tracks caller sentiment progression.",
  benchmarking:
    "**The Benchmark Hub** is a benchmarking suite evaluating models on multiple domains:\n\n" +
    "- **Histoscan (Medical Vision):** Tested Gemini 2.5 Flash (Vision) against AWS Rekognition on 1,000 cancer cells, showing Gemini achieved 94.5% detection accuracy compared to AWS's 76.2%.\n" +
    "- **ASR Transcription:** Compared ElevenLabs, Whisper Large v3, and OpenAI Whisper APIs on Word Error Rate (WER) and cost/second metrics.\n" +
    "- **Legal Text Summary:** Audited Groq LLaMA-3-70B, GPT-4o, and Gemini Pro on factual hallucination rates in contract reviews.",
  speech2vec:
    "**speech2vec Voice Biometrics** is an AI acoustic matching pipeline:\n\n" +
    "- **Acoustic Preprocessing:** Normalizes raw audio files, filters static noise, and extracts Mel-Frequency Cepstral Coefficients (MFCCs).\n" +
    "- **Clustering:** Embeds features into latent space vectors (speech2vec/wav2vec 2.0) and uses DBSCAN nearest-neighbor clustering in PyTorch to verify agent identities.",
  investor_base:
    "**Investor Base** is a secure fintech dashboard using Supabase backend-as-a-service:\n\n" +
    "- **Row-Level Security (RLS):** Configured PostgreSQL RLS policies containing EXISTS conditions on user group memberships to isolate private venture deals.\n" +
    "- **Database Functions:** Programmed secure transaction functions like atomic deal pledging.",
  skills:
    "Here are my core technical skills:\n" +
    "- **Languages:** Python, JavaScript, TypeScript, SQL, C++\n" +
    "- **AI/ML:** PyTorch, LangChain, LangGraph, Model Context Protocol, speech2vec, wav2vec 2.0\n" +
    "- **Backend & DB:** FastAPI, Node.js, Express, PostgreSQL (pgvector), Supabase, FAISS, Redis\n" +
    "- **Cloud/DevOps:** AWS (S3, SQS, RDS, EC2), Docker, OpenStack, Git\n" +
    "- **Frontend:** React, Next.js, Tailwind CSS, Framer Motion, Streamlit, Gradio",
  intern:
    "I have completed 4 professional internships:\n" +
    "1. **PAN Science Innovations (LLM Engineer Intern - Aug 2025 - Present):** Built NYAAY AI RAG, Council ERP, Twilio Voice Agent, and Opticall Call Analytics.\n" +
    "2. **Aura AI (AI Intern - Jun 2024 - Sep 2024):** Deepfake classification (CNN + XceptionNet), SRGAN 4x super-resolution, and Streamlit Stable Diffusion portals.\n" +
    "3. **PNB Housing Finance (Salesforce Intern - Oct 2024 - Nov 2024):** Automated loan management CRM workflows.\n" +
    "4. **CARTT CDC MAIT (Placement Coordinator - Jul 2024 - Aug 2024):** Coordinated logistics for placement drives (D E Shaw, Josh, ITC).",
  contact:
    "You can reach me via:\n" +
    "- **Email:** [arnavbhatiamait@gmail.com](mailto:arnavbhatiamait@gmail.com)\n" +
    "- **LinkedIn:** [linkedin.com/in/arnav-bhatia-77500425a](https://www.linkedin.com/in/arnav-bhatia-77500425a/)\n" +
    "- **GitHub:** [github.com/arnavbhatiamait](https://github.com/arnavbhatiamait)\n" +
    "- **Hugging Face:** [huggingface.co/spaces/Arnavbhatia/Food_Vision](https://huggingface.co/spaces/Arnavbhatia/Food_Vision)",
  social_media_automation:
    "**Social Media Content Automation** is an end-to-end production-ready AI pipeline I built to auto-generate and publish content.\n\n" +
    "Key highlights:\n" +
    "- **Multi-Model Generation:** LangChain (Gemini 2.5 Flash) script orchestration, Hugging Face Flux (Schnell/SDXL) image generation, and Google Cloud TTS speech creation.\n" +
    "- **Automated Video Assembly:** FFmpeg zoom/pan animation, background music mixing, and dynamic subtitle burning (SRT overlay).\n" +
    "- **Cloud & Publishing APIs:** Auto-uploads assets to Google Cloud Storage (GCS) and publishes content via Instagram Graph API (Reels, Posts, Carousels) and YouTube Data API v3 (Shorts/Videos).\n" +
    "- **Automated Workflows:** Cron schedules run the system twice daily via GitHub Actions workflows, logging metrics in Neon PostgreSQL database.",
  default:
    "Hi! I am Arnav's AI clone. I can answer questions about my internships (PAN Science, Aura AI, PNB Housing, CARTT), projects (NYAAY AI, Council, Opticall, Voice Agent, Benchmark Hub, speech2vec, Investor Base, Social Media Content Automation), skills, and contact info. Ask me anything!",
};

function getFallbackReply(message: string): string {
  const msg = message.toLowerCase();
  if (msg.includes("nyaay")) return OFFLINE_CHAT_RESPONSES.nyaay;
  if (msg.includes("council") || msg.includes("panscience.ai")) return OFFLINE_CHAT_RESPONSES.council;
  if (msg.includes("voice") || msg.includes("twilio") || msg.includes("phone")) return OFFLINE_CHAT_RESPONSES.voice;
  if (msg.includes("opticall") || msg.includes("analytics") || msg.includes("audio")) return OFFLINE_CHAT_RESPONSES.opticall;
  if (msg.includes("benchmark") || msg.includes("histoscan") || msg.includes("wer")) return OFFLINE_CHAT_RESPONSES.benchmarking;
  if (msg.includes("speech2vec") || msg.includes("biometric") || msg.includes("voiceprint") || msg.includes("wav2vec")) return OFFLINE_CHAT_RESPONSES.speech2vec;
  if (msg.includes("investor") || msg.includes("supabase") || msg.includes("rls") || msg.includes("pledge")) return OFFLINE_CHAT_RESPONSES.investor_base;
  if (msg.includes("automation") || msg.includes("instagram") || msg.includes("reels") || msg.includes("youtube") || msg.includes("veo") || msg.includes("flux")) return OFFLINE_CHAT_RESPONSES.social_media_automation;
  if (msg.includes("skill") || msg.includes("tech") || msg.includes("stack")) return OFFLINE_CHAT_RESPONSES.skills;
  if (
    msg.includes("intern") ||
    msg.includes("experience") ||
    msg.includes("job") ||
    msg.includes("work") ||
    msg.includes("pan") ||
    msg.includes("science") ||
    msg.includes("aura") ||
    msg.includes("pnb")
  ) {
    return OFFLINE_CHAT_RESPONSES.intern;
  }
  if (msg.includes("contact") || msg.includes("email") || msg.includes("hire") || msg.includes("reach")) return OFFLINE_CHAT_RESPONSES.contact;
  return OFFLINE_CHAT_RESPONSES.default;
}

const systemInstruction = `You are Arnav's AI clone, representing Arnav Bhatia (an AI/ML Engineer and Full Stack Developer). Answer the user's questions about Arnav's projects, experience, skills, and availability in a professional, polite, and enthusiastic tone. Use first-person ('I did this...', 'In my internship...'). Keep your responses relatively concise and well-formatted using markdown. If the user asks about topics completely unrelated to Arnav or coding/technology, politely redirect them back to Arnav's qualifications.

Here are the facts about Arnav:
- Based in India.
- Email: arnavbhatiamait@gmail.com
- LinkedIn: https://www.linkedin.com/in/arnav-bhatia-77500425a/
- GitHub: https://github.com/arnavbhatiamait
- Hugging Face Spaces: https://huggingface.co/spaces/Arnavbhatia/Food_Vision

Internships & Experience:
1. PAN Science Innovations (LLM Engineer Intern - Aug 2025 - Present):
   * Built NYAAY AI: Legal RAG with S3-SQS-EC2 ingest pipeline, RecursiveCharacterTextSplitter legal boundary chunking, pgvector Postgres search, RRF merging.
   * Built Twilio Voice Agent: WebSocket raw audio base64 streams, Whisper/Deepgram STT, LangChain prompt orchestration, ElevenLabs TTS streaming, barge-in buffer flush.
   * Built Council: Database design (highly normalized schema) and full-stack Next.js/Express app live at council.panscience.ai.
   * Built Opticall: Call analytics dashboard with speaker diarization, Talk-to-Listen ratio calculation, dead air detection, sentiment mapping.
   * Built The Benchmark Hub: Ran histopathology tumor cell detection comparisons showing Gemini Vision achieved 94.5% detection accuracy vs AWS Rekognition's 76.2% on 1,000 histology cell samples.
   * Researched voice biometrics (speech2vec, wav2vec 2.0) using 13-coefficient MFCC feature extraction and DBSCAN Euclidean clustering.
2. Aura AI (AI Intern - Jun 2024 - Sep 2024):
   * Developed deepfake detection models (CNN + XceptionNet).
   * Built SRGAN pipelines for 4x image super-resolution.
   * Built Streamlit and FastAPI wrappers for Stable Diffusion and ControlNet.
3. PNB Housing Finance (Salesforce Intern - Oct 2024 - Nov 2024):
   * Optimized Loan Management System database workflows.
4. CARTT CDC MAIT (Placement Coordinator - Jul 2024 - Aug 2024):
   * Coordinated logistics and tracking for D E Shaw, Josh, ITC drives.

Other Highlight Projects:
- Investor Base: Fintech MVP designed on Supabase utilizing PostgreSQL Row Level Security (RLS) policies with EXISTS group member checks to securely isolate private venture capital deals, and automated user profile mapping.
- Social Media Content Automation: End-to-end Python pipeline orchestrating Gemini 2.5 Flash (LangChain) script generation, HF Flux/SDXL image generation, Google Cloud TTS speech synthesis, FFmpeg video rendering (zoom/pan motion effects, dynamic subtitle burning, music mixing), GCS cloud storage uploading, and automatic posting to Instagram and YouTube via APIs, scheduled twice daily with GitHub Actions workflows and logged in PostgreSQL database.`;

export async function POST(request: Request) {
  let message = "";
  let history: ChatMessage[] = [];
  let modelUsed = "local_simulator";
  let modeUsed: "api" | "local_simulator" = "local_simulator";

  console.log("Received chat request");
  console.log("Request body:", await request.clone().text()); // Log the raw request body for debugging
  try {
    const body = await request.json();
    message = body.message;
    history = body.history || [];

    if (!message || message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      const reply = getFallbackReply(message);
      return NextResponse.json({ reply, mode: modeUsed, model: modelUsed });
    }

    const primaryModel = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    const fallbackModel = "gemini-2.5-flash";

    // Build the request contents structure matching Gemini API format
    const contents: GeminiContent[] = [];
    const slicedHistory = (history || []).slice(-6);
    
    // Ensure history alternates roles correctly
    for (const msg of slicedHistory) {
      if (!msg.content || msg.content.trim().length === 0) continue;
      const role = msg.role === "assistant" ? "model" : "user";
      
      const last = contents[contents.length - 1];
      if (last && last.role === role) {
        last.parts[0].text += "\n" + msg.content;
      } else {
        contents.push({
          role,
          parts: [{ text: msg.content }],
        });
      }
    }

    // Append the new message
    const last = contents[contents.length - 1];
    if (last && last.role === "user") {
      last.parts[0].text += "\n" + message;
    } else {
      contents.push({
        role: "user",
        parts: [{ text: message }],
      });
    }

    // First message must be sent by user
    if (contents.length > 0 && contents[0].role === "model") {
      contents.shift();
    }

    const buildGeminiBody = () => ({
      contents,
      systemInstruction: {
        parts: [{ text: systemInstruction }],
      },
    });

    const callGemini = async (model: string) => {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(buildGeminiBody()),
      });
    };

    let response = await callGemini(primaryModel);
    console.log(`Initial Gemini API call to model ${primaryModel} returned status:`, response.status);
    if (!response.ok && primaryModel !== fallbackModel) {
      const retryText = await response.text();
      const shouldRetryWithFallback =
        response.status === 404 ||
        /model.*not found|unsupported|not available/i.test(retryText);

      if (shouldRetryWithFallback) {
        response = await callGemini(fallbackModel);
        modelUsed = fallbackModel;
      } else if (response.status === 400 || response.status === 401 || response.status === 403) {
        const reply = getFallbackReply(message);
        console.warn("Gemini API authentication error detected on primary model. Falling back to local simulator. Details:", retryText);
        
        return NextResponse.json({ reply, mode: modeUsed, model: modelUsed });
      } else {
        console.error("Gemini API Error details:", retryText);
        throw new Error(`Gemini API call failed with status: ${response.status}. Details: ${retryText}`);
      }
    } else {
      modelUsed = primaryModel;
    }

    if (!response.ok) {
      const errText = await response.text();
      const isAuthError =
        response.status === 400 ||
        response.status === 401 ||
        response.status === 403 ||
        /API key not valid|API_KEY_INVALID|invalid api key/i.test(errText);

      if (isAuthError) {
        const reply = getFallbackReply(message);
        console.warn("Gemini API authentication error detected. Falling back to local simulator. Details:", errText);
        return NextResponse.json({ reply, mode: modeUsed, model: modelUsed });
      }

      console.error("Gemini API Error details:", errText);
      throw new Error(`Gemini API call failed with status: ${response.status}. Details: ${errText}`);
    }

    const resData = await response.json();
    const reply = resData.candidates?.[0]?.content?.parts?.[0]?.text || getFallbackReply(message);
    modeUsed = "api";
    console.log("Gemini API call successful. Model used:", modelUsed);
    console.log("API response content:", reply);

    return NextResponse.json({ reply, mode: modeUsed, model: modelUsed });
  } catch (error) {
    console.error("Gemini API call failed:", error);
    // Gracefully fall back to local simulator without trying to re-read the request stream
    const reply = getFallbackReply(message || "");
    return NextResponse.json({ reply, mode: modeUsed, model: modelUsed });
  }
}
