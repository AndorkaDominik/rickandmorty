import { Badge } from "@radix-ui/themes";

type BadgeColor = "green" | "red" | "gray" | "blue" | "pink" | "violet";
type BadgeKind = "status" | "gender";

const BADGE_COLORS: Record<BadgeKind, Record<string, BadgeColor>> = {
  status: {
    alive: "green",
    dead: "red",
    unknown: "gray",
  },
  gender: {
    female: "pink",
    male: "blue",
    genderless: "violet",
    unknown: "gray",
  },
};

export default function CustomBadge({
  value = "unknown",
  kind,
}: {
  value?: string | null;
  kind: BadgeKind;
}) {
  const normalizedValue = (value ?? "unknown").toLowerCase();
  const color = BADGE_COLORS[kind][normalizedValue] ?? "gray";

  return (
    <Badge
      variant="soft"
      radius="full"
      size={{ initial: "1", sm: "2", md: "3" }}
      color={color}
      style={{
        display: "inline-flex",
        alignItems: "center",
        whiteSpace: "nowrap",
        maxWidth: "100%",
        gap: "clamp(4px, 1vw, 8px)",
        fontWeight: 600,
        letterSpacing: "0.01em",
        fontSize: "clamp(10px, 1.6vw, 14px)",
        paddingInline: "clamp(6px, 1.8vw, 12px)",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: "clamp(6px, 1.2vw, 8px)",
          height: "clamp(6px, 1.2vw, 8px)",
          borderRadius: "50%",
          backgroundColor: "currentColor",
          opacity: 0.9,
        }}
      />
      {value}
    </Badge>
  );
}
