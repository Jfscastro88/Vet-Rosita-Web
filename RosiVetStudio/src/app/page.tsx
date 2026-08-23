import Hero from "@/components/hero/Hero";
import AboutUs from "@/components/about/AboutUs";
import AnimalsWeCareFor from "@/components/animals/AnimalsWeCareFor";
import Services from "@/components/services/Services";
import LocationContact from "@/components/contacts/LocationContact";

export default function HomePage() {
  return (
    <div className="w-full" style={{ backgroundColor: "#F4F6F2" }}>
      <Hero />
      <AboutUs />
      <AnimalsWeCareFor />
      <Services />
      <LocationContact />

      <div className="py-4 text-center">
        <p style={{ color: "#2F3A2F", fontSize: "var(--mantine-font-size-xs)", margin: 0 }}>
          aut. 01/2025
        </p>
      </div>
    </div>
  );
}
