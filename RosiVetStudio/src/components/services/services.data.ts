import type { StaticImageData } from "next/image";
import consulenzaImg from "@/assets/services/consulenza.jpg";
import esamiImg from "@/assets/services/poop.jpg";
import lezioniImg from "@/assets/services/lezioni.jpg";
import laserterapiaImg from "@/assets/services/laserterapia.jpg";
import terapieImg from "@/assets/services/terapie.jpg";
import testrapidoImg from "@/assets/services/testrapido.jpg";
import vaccinazioniImg from "@/assets/services/vaccinazioni.jpg";
import visitecanegatoImg from "@/assets/services/visitecanegato.jpg";
import visiteesoticiImg from "@/assets/services/visiteesotici.jpg";
import visitespecialImg from "@/assets/services/visitespecial.jpg";
import vistebaseImg from "@/assets/services/visitebase.jpg";

export type Service = {
  image: StaticImageData;
  title: string;
  description: string;
  importance: string;
  curiosity: string;
  alt?: string;
};

export const services: Service[] = [
  {
    image: vistebaseImg,
    title: "Visite base cane e gatto",
    description: "Controlli di routine e visite per cani e gatti.",
    importance:
      "I controlli di routine permettono di individuare precocemente eventuali problemi di salute, quando sono ancora più semplici da trattare. Una visita regolare aiuta a valutare peso, alimentazione, denti, pelle e comportamento, e a definire insieme un piano di prevenzione su misura.",
    curiosity:
      "Molti animali mostrano i primi segnali di disagio in modo discreto. Un controllo periodico aiuta a cogliere anche i cambiamenti più sottili, prima che diventino evidenti a casa.",
  },
  {
    image: visitespecialImg,
    title: "Visite specialistiche",
    description: "Animali esotici e non convenzionali.",
    importance:
      "Gli animali esotici e non convenzionali hanno esigenze anatomiche e metaboliche diverse da cani e gatti. Una visita specialistica consente di valutare specie, alimentazione, ambiente e segni clinici con un approccio dedicato, riducendo il rischio di valutazioni incomplete.",
    curiosity:
      "Conigli, rettili, uccelli e piccoli mammiferi nascondono spesso i sintomi per istinto di sopravvivenza. Per questo una valutazione specifica è utile anche quando l'animale sembra stare ancora bene.",
  },
  {
    image: vaccinazioniImg,
    title: "Vaccinazioni",
    description: "Programmi vaccinali per cani, gatti e conigli.",
    importance:
      "Le vaccinazioni aiutano a proteggere gli animali da malattie infettive potenzialmente gravi. Il programma vaccinale viene personalizzato in base all'età, allo stile di vita e alle condizioni di salute dell'animale.",
    curiosity:
      "Non tutti gli animali hanno bisogno dello stesso programma vaccinale: anche l'ambiente in cui vivono e le loro abitudini possono influenzare la scelta dei vaccini.",
  },
  {
    image: laserterapiaImg,
    title: "Laserterapia veterinaria",
    description:
      "Trattamento non invasivo che aiuta a ridurre dolore e infiammazione, favorendo il recupero e i naturali processi di guarigione.",
    alt: "Laserterapia veterinaria su un animale",
    importance:
      "La laserterapia è un trattamento non invasivo che può affiancare altre cure per alleviare dolore e infiammazione. Aiuta i tessuti nel recupero ed è indicata in diverse situazioni, dalle articolazioni infiammate alle ferite in fase di guarigione.",
    curiosity:
      "Il laser terapeutico non taglia e non brucia: usa una luce specifica per stimolare le cellule. Molti animali restano rilassati durante la seduta, che di solito è breve e non richiede sedazione.",
  },
  {
    image: esamiImg,
    title: "Esami coprologici",
    description: "Analisi e test di laboratorio.",
    importance:
      "L'esame delle feci permette di individuare parassiti intestinali e altre alterazioni che non sempre si vedono a occhio nudo. È uno strumento semplice e utile per proteggere la salute dell'animale e, in alcuni casi, anche quella della famiglia.",
    curiosity:
      "Un animale può ospitare parassiti anche se le feci sembrano normali. Per questo l'esame coprologico è spesso consigliato in modo periodico, non solo quando compaiono sintomi evidenti.",
  },
  {
    image: testrapidoImg,
    title: "Test rapidi",
    description: "Test rapidi per cani e gatti.",
    importance:
      "I test rapidi forniscono indicazioni utili in tempi brevi, ad esempio in caso di sospetta infezione o di sintomi improvvisi. Permettono di orientare subito le successive decisioni, riducendo l'attesa e l'incertezza per l'animale e per chi se ne prende cura.",
    curiosity:
      "Un test rapido non sostituisce sempre un esame di laboratorio più approfondito, ma può dare una prima risposta concreta già in ambulatorio, proprio quando serve una decisione tempestiva.",
  },
  {
    image: consulenzaImg,
    title: "Consulenze",
    description: "Pre-adozione e consulenze online.",
    importance:
      "Una consulenza prima dell'adozione, o un confronto online, aiuta a scegliere con più consapevolezza e a prevenire problemi di gestione. È il momento giusto per parlare di specie, spazio, alimentazione, convivenza e aspettative realistiche.",
    curiosity:
      "Molte difficoltà arrivano dopo l'adozione, quando l'animale e la famiglia non si conoscono ancora. Anticipare queste domande rende l'accoglienza più serena per entrambi.",
  },
  {
    image: lezioniImg,
    title: "Educazione cinofila",
    description: "Lezioni per cuccioli e cani di ogni età.",
    importance:
      "L'educazione cinofila sostiene la relazione tra cane e famiglia, aiutando a gestire emozioni, comunicazione e vita quotidiana. Intervenire da cuccioli, o anche in età adulta, riduce stress, malintesi e comportamenti difficili da interpretare.",
    curiosity:
      "Un cane non disobbedisce per capriccio: spesso sta comunicando disagio, confusione o un bisogno non compreso. Un percorso educativo parte da questo, non dalla punizione.",
  },
  {
    image: visiteesoticiImg,
    title: "Visite animali esotici",
    description: "Visite a domicilio per esotici e da cortile.",
    importance:
      "Portare in ambulatorio un animale esotico o da cortile può essere fonte di grande stress. La visita a domicilio permette di osservarlo nel proprio ambiente, valutando anche gabbia, recinto, temperatura e alimentazione in modo più realistico.",
    curiosity:
      "Per molti conigli, uccelli e rettili, il viaggio e l'ambiente nuovo pesano quanto il disturbo stesso. Vedere l'animale a casa aiuta a capire meglio come vive davvero, non solo come si presenta in visita.",
  },
  {
    image: visitecanegatoImg,
    title: "Visite a domicilio cane e gatto",
    description: "Visite a domicilio per cani e gatti.",
    importance:
      "Alcuni cani e gatti vivono con ansia il trasporto o l'ambulatorio. La visita a domicilio riduce questo stress e consente di valutare l'animale nel contesto in cui vive, utile anche per chi ha difficoltà a spostarsi.",
    curiosity:
      "I gatti, in particolare, possono mascherare il malessere e reagire al trasportino. Osservarli in casa permette spesso di cogliere aspetti del comportamento e dell'ambiente che in studio resterebbero nascosti.",
  },
  {
    image: terapieImg,
    title: "Terapie a domicilio",
    description: "Terapie a domicilio per cane, gatto ed esotici.",
    importance:
      "Alcune terapie vanno ripetute con costanza e, per l'animale, è più sereno riceverle a casa. Il supporto domiciliare aiuta a seguire correttamente le indicazioni, a gestire medicazioni e a rendere le cure meno faticose per la famiglia.",
    curiosity:
      "La continuità delle cure fa una grande differenza: anche un trattamento efficace perde valore se a casa diventa difficile da eseguire. Per questo affiancare la famiglia nel quotidiano è parte integrante della terapia.",
  },
];
