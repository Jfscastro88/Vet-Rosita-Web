"use client";

import Image from "next/image";
import { Modal, Title, Text } from "@mantine/core";
import { useReducedMotion } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import type { Animal } from "./animals.data";
import classes from "./AnimalDetailModal.module.css";

type AnimalDetailModalProps = {
  animal: Animal | null;
  opened: boolean;
  onClose: () => void;
};

export default function AnimalDetailModal({ animal, opened, onClose }: AnimalDetailModalProps) {
  const reduceMotion = useReducedMotion();

  return (
    <Modal.Root
      opened={opened}
      onClose={onClose}
      centered
      size="52rem"
      padding={0}
      radius="md"
      lockScroll
      trapFocus
      returnFocus
      closeOnEscape
      closeOnClickOutside
      zIndex={2000}
      transitionProps={{
        transition: "pop",
        duration: reduceMotion ? 0 : 220,
      }}
      styles={{
        inner: {
          padding:
            "max(0.75rem, env(safe-area-inset-top)) 1rem max(0.75rem, env(safe-area-inset-bottom))",
        },
        content: {
          backgroundColor: "#FFFFFF",
          border: "1px solid #daddd7",
          boxShadow: "0 8px 30px rgba(47, 58, 47, 0.18)",
          overflow: "hidden",
          maxWidth: "min(52rem, calc(100vw - 2rem))",
          maxHeight: "min(90dvh, 44rem)",
          display: "flex",
          flexDirection: "column",
        },
        body: {
          padding: 0,
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
        },
      }}
    >
      <Modal.Overlay backgroundOpacity={0.42} blur={8} color="#2F3A2F" />
      <Modal.Content>
        <Modal.Body>
          {animal ? (
            <div className={classes.shell}>
              <button
                type="button"
                className={classes.closeButton}
                onClick={onClose}
                aria-label={`Chiudi il dettaglio di ${animal.name}`}
              >
                <IconX size={20} stroke={2} aria-hidden="true" />
              </button>
              <div className={classes.layout}>
                <div className={classes.imageWrap}>
                  <Image
                    src={animal.image}
                    alt={animal.name}
                    fill
                    sizes="(max-width: 767px) 100vw, 42vw"
                    className={classes.image}
                  />
                </div>
                <div className={classes.content}>
                  <div>
                    <Modal.Title className={classes.title}>{animal.name}</Modal.Title>
                    <Text className={classes.summary} mt="sm">
                      {animal.summary}
                    </Text>
                  </div>
                  <div>
                    <Title order={3} className={classes.sectionLabel}>
                      Curiosità
                    </Title>
                    <Text className={classes.sectionText}>{animal.curiosity}</Text>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
