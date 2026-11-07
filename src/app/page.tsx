import About from "@/components/about";
import Hero from "@/components/hero";
import Services from "@/components/services";
import SelectedWork from "@/components/work/selected-work";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <SelectedWork />
      <Services />
    </main>
  );
}
