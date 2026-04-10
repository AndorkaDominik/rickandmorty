import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Button, Card, Flex, Text } from "@radix-ui/themes";
import { type CSSProperties } from "react";

type PaginationControlsProps = {
  page: number;
  totalPages: number;
  isLoading: boolean;
  onPrevious: () => void;
  onNext: () => void;
  style?: CSSProperties;
};

export default function PaginationControls({
  page,
  totalPages,
  isLoading,
  onPrevious,
  onNext,
  style,
}: PaginationControlsProps) {
  const isPreviousDisabled = page <= 1 || isLoading;
  const isNextDisabled = page >= totalPages || isLoading;

  return (
    <Card
      variant="surface"
      className="pagination-card"
      mt="4"
      style={{ width: "100%", backgroundColor: "var(--accent-2)", ...style }}
    >
      <Flex align="center" justify="center" gap="3" wrap="wrap">
        <Button
          type="button"
          variant="soft"
          disabled={isPreviousDisabled}
          onClick={onPrevious}
          style={{ cursor: isPreviousDisabled ? "not-allowed" : "pointer" }}
        >
          <ArrowLeftIcon />
          <span className="pagination-button-label">Previous</span>
        </Button>

        <Text size={{ initial: "2", sm: "3", md: "4" }} weight="medium" className="pagination-label">
          Page {page} of {totalPages}
        </Text>

        <Button
          type="button"
          variant="soft"
          disabled={isNextDisabled}
          onClick={onNext}
          style={{ cursor: isNextDisabled ? "not-allowed" : "pointer" }}
        >
          <span className="pagination-button-label">Next</span>
          <ArrowRightIcon />
        </Button>
      </Flex>
    </Card>
  );
}