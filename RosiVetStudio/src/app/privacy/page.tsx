"use client";

import React from "react";
import { Box, Container, Title, Text, Stack, List } from "@mantine/core";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <Box className="min-h-screen w-full" style={{ backgroundColor: "#F4F6F2" }}>
      <Container size="md" py="xl">
        <Stack gap="xl">
          <Title order={1} style={{ color: "#2F3A2F" }}>
            Informativa sulla Privacy
          </Title>
          <Text size="md" style={{ color: "#2F3A2F" }} className="leading-relaxed">
            Questa Informativa spiega come Rosita VetStudio tratta i dati
            personali quando visiti il nostro sito portfolio. Il sito è
            puramente informativo e non utilizza cookie di analisi o marketing.
          </Text>

          <Stack gap="md">
            <Title order={2} size="h4" style={{ color: "#2F3A2F" }}>
              1. Titolare del trattamento
            </Title>
            <Text size="md" style={{ color: "#2F3A2F" }} className="leading-relaxed">
              Il titolare del trattamento dei dati personali è Rosita VetStudio.
              Per esercitare i tuoi diritti o per domande su questa informativa
              puoi contattarci ai numeri o indirizzi indicati nel sito.
            </Text>
          </Stack>

          <Stack gap="md">
            <Title order={2} size="h4" style={{ color: "#2F3A2F" }}>
              2. Dati che raccogliamo
            </Title>
            <Text size="md" style={{ color: "#2F3A2F" }} className="leading-relaxed">
              Durante la navigazione sul sito possono essere raccolti in modo
              automatico:
            </Text>
            <List size="md" style={{ color: "#2F3A2F" }}>
              <List.Item>Indirizzo IP e dati tecnici di connessione</List.Item>
              <List.Item>Tipo di browser e dispositivo</List.Item>
              <List.Item>Pagine visitate e data/ora di accesso</List.Item>
            </List>
            <Text size="md" style={{ color: "#2F3A2F" }} className="leading-relaxed">
              Se ci contatti tramite telefono, email o altri canali indicati nel
              sito, tratteremo i dati che ci fornisci (nome, numero, messaggio)
              solo per rispondere alla tua richiesta.
            </Text>
          </Stack>

          <Stack gap="md">
            <Title order={2} size="h4" style={{ color: "#2F3A2F" }}>
              3. Finalità e base giuridica
            </Title>
            <Text size="md" style={{ color: "#2F3A2F" }} className="leading-relaxed">
              I dati sono trattati per: garantire il corretto funzionamento del
              sito, rispondere alle richieste di contatto e adempiere eventuali
              obblighi di legge. La base giuridica è il legittimo interesse
              (funzionamento del sito) e, per i contatti, l’esecuzione di misure
              precontrattuali o il consenso.
            </Text>
          </Stack>

          <Stack gap="md">
            <Title order={2} size="h4" style={{ color: "#2F3A2F" }}>
              4. Cookie
            </Title>
            <Text size="md" style={{ color: "#2F3A2F" }} className="leading-relaxed">
              Questo sito non utilizza cookie di analisi (es. Google Analytics)
              né cookie di profilazione o marketing. Possono essere utilizzati
              solo cookie tecnici strettamente necessari al funzionamento del
              sito (es. preferenze di visualizzazione). Non è richiesto alcun
              consenso per i cookie tecnici.
            </Text>
          </Stack>

          <Stack gap="md">
            <Title order={2} size="h4" style={{ color: "#2F3A2F" }}>
              5. Conservazione dei dati
            </Title>
            <Text size="md" style={{ color: "#2F3A2F" }} className="leading-relaxed">
              I dati di navigazione sono conservati per il tempo strettamente
              necessario (anche in forma aggregata o anonima). I dati forniti in
              seguito a un contatto sono conservati per il tempo necessario a
              gestire la richiesta e per eventuali obblighi di legge.
            </Text>
          </Stack>

          <Stack gap="md">
            <Title order={2} size="h4" style={{ color: "#2F3A2F" }}>
              6. Diritti dell’interessato
            </Title>
            <Text size="md" style={{ color: "#2F3A2F" }} className="leading-relaxed">
              In base al Regolamento UE 2016/679 (GDPR) hai diritto a:
            </Text>
            <List size="md" style={{ color: "#2F3A2F" }}>
              <List.Item>Accesso ai tuoi dati personali</List.Item>
              <List.Item>Rettifica o cancellazione dei dati</List.Item>
              <List.Item>Limitazione del trattamento</List.Item>
              <List.Item>Portabilità dei dati (ove applicabile)</List.Item>
              <List.Item>Opporti al trattamento</List.Item>
              <List.Item>
                Proporre reclamo all’Autorità Garante per la Protezione dei Dati
                Personali (garanteprivacy.it)
              </List.Item>
            </List>
          </Stack>

          <Stack gap="md">
            <Title order={2} size="h4" style={{ color: "#2F3A2F" }}>
              7. Modifiche
            </Title>
            <Text size="md" style={{ color: "#2F3A2F" }} className="leading-relaxed">
              Questa informativa può essere aggiornata. La versione corrente è
              sempre disponibile su questa pagina. Ti invitiamo a consultarla
              periodicamente.
            </Text>
          </Stack>

          <Stack gap="md">
            <Title order={2} size="h4" style={{ color: "#2F3A2F" }}>
              8. Contatti
            </Title>
            <Text size="md" style={{ color: "#2F3A2F" }} className="leading-relaxed">
              Per domande sulla privacy o per esercitare i tuoi diritti puoi
              contattare Rosita VetStudio tramite i recapiti pubblicati nella
              sezione contatti del sito.
            </Text>
          </Stack>

          <Link
            href="/"
            style={{
              color: "#869684",
              textDecoration: "underline",
              fontWeight: 500,
            }}
            className="hover:opacity-80 transition-opacity mt-4"
          >
            ← Torna alla home
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}
