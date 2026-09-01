import type { StaticImageData } from "next/image";
import animal01 from "@/assets/animals/conigli.jpg";
import animal02 from "@/assets/animals/criceti.jpg";
import animal03 from "@/assets/animals/cavie.jpg";
import animal04 from "@/assets/animals/furetti.jpg";
import animal05 from "@/assets/animals/canario.jpg";
import animal06 from "@/assets/animals/rettilli.jpg";
import animal07 from "@/assets/animals/selvatici.jpg";
import animal08 from "@/assets/animals/cincilla.jpg";
import animal09 from "@/assets/animals/degu.jpg";
import animal10 from "@/assets/animals/rattodomestico.jpg";
import animal11 from "@/assets/animals/topolino.jpg";
import animal12 from "@/assets/animals/galina.jpg";
import animal13 from "@/assets/animals/cani.jpg";
import animal14 from "@/assets/animals/gatti.jpg";

export type Animal = {
  name: string;
  image: StaticImageData;
  summary: string;
  curiosity: string;
};

export const animals: Animal[] = [
  {
    name: "Conigli",
    image: animal01,
    summary:
      "I conigli hanno un apparato digerente delicato e nascondono spesso i primi segnali di malessere. Una visita dedicata aiuta a valutare alimentazione, denti e ambiente di vita, tre aspetti che influenzano moltissimo il loro benessere.",
    curiosity:
      "I denti del coniglio crescono per tutta la vita: masticare fieno in abbondanza non è un vezzo, è una necessità quotidiana.",
  },
  {
    name: "Criceti",
    image: animal02,
    summary:
      "Piccoli, veloci e facilmente stressabili, i criceti hanno bisogno di una valutazione attenta e il più possibile tranquilla. Ci occupiamo della loro salute tenendo conto di alimentazione, nido e abitudini notturne.",
    curiosity:
      "Molti criceti sono più attivi di notte: un controllo serale, o comunque rispettoso dei loro ritmi, può renderli più collaborativi.",
  },
  {
    name: "Cavie",
    image: animal03,
    summary:
      "Le cavie non producono da sole la vitamina C e dipendono da una dieta corretta. In visita valutiamo denti, peso, pelle e convivenza, perché il loro benessere passa anche dalla compagnia e dalla routine quotidiana.",
    curiosity:
      "Una cavia che smette di mangiare anche solo per poche ore può peggiorare in fretta: per questo i piccoli cambiamenti a casa meritano attenzione.",
  },
  {
    name: "Cani",
    image: animal13,
    summary:
      "Accogliamo anche visite di base per i cani, con attenzione a prevenzione, alimentazione e relazione con la famiglia. L'obiettivo è un controllo sereno, utile sia per i cuccioli sia per i cani adulti o anziani.",
    curiosity:
      "Molti segnali di disagio nel cane passano dal comportamento prima che da un sintomo evidente: un cambiamento nelle abitudini merita sempre un ascolto attento.",
  },
  {
    name: "Gatti",
    image: animal14,
    summary:
      "I gatti mascherano spesso il malessere e vivono con ansia il trasporto. Offriamo visite di base in studio e, quando serve, a domicilio, per valutarli nel modo meno stressante possibile.",
    curiosity:
      "Un gatto che si nasconde di più, mangia meno o smette di curarsi il pelo sta spesso comunicando un disagio, anche se sembra ancora «normale».",
  },
  {
    name: "Selvatici",
    image: animal07,
    summary:
      "La fauna selvatica ha esigenze diverse dagli animali da compagnia e va gestita con competenza e rispetto. Quando è opportuno, valutiamo l'animale con un approccio dedicato al recupero e al benessere della specie.",
    curiosity:
      "Un animale selvatico in difficoltà non va «adottato» d'impulso: il primo passo utile è contattare chi può valutarlo senza aumentare lo stress.",
  },
  {
    name: "Furetti",
    image: animal04,
    summary:
      "I furetti sono animali curiosi, attivi e con necessità sanitarie specifiche. In visita consideriamo età, alimentazione, vaccinazioni e ambiente di vita, per costruire un piano di cura su misura.",
    curiosity:
      "Il furetto può nascondere i sintomi fino a quando il problema è già avanzato: i controlli periodici sono particolarmente utili, anche quando sembra in forma.",
  },
  {
    name: "Pappagalli e Uccelli",
    image: animal05,
    summary:
      "Uccelli e pappagalli hanno un metabolismo rapido e un apparato respiratorio delicato. Una visita specialistica permette di valutare alimentazione, voliera, comportamento e primi segnali di affaticamento.",
    curiosity:
      "Un pappagallo che sta più fermo, arruffa le piume o mangia meno può essere già in difficoltà: negli uccelli i cambiamenti arrivano in fretta.",
  },
  {
    name: "Topolini",
    image: animal11,
    summary:
      "I topolini domestici sono piccoli e sensibili allo stress, alla temperatura e alla convivenza. Ci occupiamo della loro salute con una valutazione attenta di peso, pelle, denti e condizioni della gabbia.",
    curiosity:
      "Vivono in gruppi sociali complessi: tensioni, ferite o un animale isolato dal resto del gruppo sono segnali da non sottovalutare.",
  },
  {
    name: "Rettili",
    image: animal06,
    summary:
      "I rettili dipendono da temperatura, umidità, luce e alimentazione in modo molto più stretto di quanto si pensi. In visita osserviamo sia l'animale sia il terrario, perché l'ambiente è parte della cura.",
    curiosity:
      "Molti problemi dei rettili nascono da un terrario non ancora ben regolato, più che da una malattia improvvisa: prevenire è spesso più efficace che intervenire tardi.",
  },
  {
    name: "Cincillà",
    image: animal08,
    summary:
      "I cincillà hanno un pelo densissimo, denti in crescita continua e bisogno di fresco. Una visita dedicata aiuta a prevenire problemi dentali, di temperatura e di alimentazione, tre punti critici per questa specie.",
    curiosity:
      "Il bagno di sabbia non è un gioco: per il cincillà è il modo naturale di prendersi cura del mantello, e l'acqua può invece danneggiarlo.",
  },
  {
    name: "Degu",
    image: animal09,
    summary:
      "I degu sono roditori sociali, attivi e con una predisposizione particolare a problemi di denti e di glicemia. In visita prestiamo attenzione a dieta, convivenza e segni precoci di disagio.",
    curiosity:
      "I dolci e la frutta troppo zuccherina non sono un premio per il degu: la loro alimentazione deve restare povera di zuccheri semplici.",
  },
  {
    name: "Ratti Domestici",
    image: animal10,
    summary:
      "I ratti domestici sono animali intelligenti, affettuosi e molto recettivi alla relazione con la famiglia. Ci occupiamo della loro salute valutando respiro, pelle, peso e qualità della vita in gabbia.",
    curiosity:
      "Un ratto che starnutisce spesso, respira in modo rumoroso o perde interesse per il gioco merita un controllo: i problemi respiratori sono tra i più frequenti.",
  },
  {
    name: "Animali da Cortile",
    image: animal12,
    summary:
      "Galline, piccoli animali da cortile e specie affini hanno bisogno di una valutazione che tenga conto di gruppo, recinto, alimentazione e uova. Possiamo vederli in studio o a domicilio, per ridurne lo stress.",
    curiosity:
      "Una gallina che si isola, smette di razzolare o cambia la qualità delle uova sta spesso segnalando un problema, anche se il resto del gruppo sembra in salute.",
  },
];
