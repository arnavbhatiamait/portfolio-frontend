import { PortfolioPage } from "@/components/portfolio-page";
import { siteContent } from "@/lib/content";

export default function Home() {
  return <PortfolioPage content={siteContent} />;
}
