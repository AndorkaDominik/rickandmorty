import { ArrowLeftIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  Box,
  Card,
  Code,
  DataList,
  Flex,
  Heading,
  Link as RadixLink,
  Text,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { type Character } from "rickmortyapi";
import CustomBadge from "../components/CustomBadge";
import { type NavigationState } from "../types/NavigationState";

export default function Profile() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Character | null>(null);
  const detailTextSize = { initial: "2", md: "3" } as const;

  const handleBackToHome = () => {
    const state = (location.state ?? {}) as NavigationState;
    const fromPage = Number(state.page);

    if (Number.isInteger(fromPage) && fromPage > 1) {
      navigate("/", { state: { page: fromPage } });
      return;
    }

    navigate("/");
  };

  useEffect(() => {
    if (!id) {
      setCharacter(null);
      return;
    }

    const characterId = Number(id);

    if (!Number.isInteger(characterId) || characterId <= 0) {
      setCharacter(null);
      return;
    }

    fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCharacter(data);
      })
      .catch((err) => {
        console.error(err);
        setCharacter(null);
      });
  }, [id]);

  const createdAt = character
    ? new Date(character.created).toLocaleString()
    : "-";
  const episodes = character?.episode ?? [];

  const getEpisodeLabel = (episodeUrl: string) => {
    const episodeId = episodeUrl.split("/").pop();
    return `Episode ${episodeId ?? "?"}`;
  };

  return (
    <div className="page">
      <div
        className="container"
        style={{ alignContent: "center", justifyContent: "center" }}
      >
        <Card variant="surface" className="banner" mt="8">
          <div className="banner">
            <button
              type="button"
              className="back-link"
              onClick={handleBackToHome}
            >
              <ArrowLeftIcon />
              Back to Home
            </button>

            <Flex align="center" justify="center" direction="column" mt="4">
              <Avatar
                src={character?.image}
                alt={character?.name}
                className="avatar"
                fallback={character?.name?.charAt(0) ?? "?"}
                radius="full"
                size="9"
              />
            </Flex>
            <Heading size="8" mt="3" mb="5" align="center">
              <span style={{ color: "var(--accent-9)" }}>
                {character?.name}
              </span>
            </Heading>
            <Flex align="center" justify="center" mb="5" gap="4">
              <CustomBadge
                value={character?.status ?? "unknown"}
                kind="status"
              />

              <CustomBadge
                value={character?.gender ?? "unknown"}
                kind="gender"
              />
            </Flex>
          </div>
          <Box className="datalist-container">
            <DataList.Root orientation="horizontal" className="datalist">
              <DataList.Item>
                <DataList.Label minWidth="88px">
                  <Text
                    as="span"
                    size={detailTextSize}
                    weight="medium"
                    color="gray"
                  >
                    ID
                  </Text>
                </DataList.Label>
                <DataList.Value>
                  <Text as="span" size={detailTextSize}>
                    {character?.id ?? "-"}
                  </Text>
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">
                  <Text
                    as="span"
                    size={detailTextSize}
                    weight="medium"
                    color="gray"
                  >
                    Name
                  </Text>
                </DataList.Label>
                <DataList.Value>
                  <Text as="span" size={detailTextSize}>
                    {character?.name ?? "-"}
                  </Text>
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">
                  <Text
                    as="span"
                    size={detailTextSize}
                    weight="medium"
                    color="gray"
                  >
                    Status
                  </Text>
                </DataList.Label>
                <DataList.Value>
                  <Text as="span" size={detailTextSize}>
                    {character?.status ?? "-"}
                  </Text>
                </DataList.Value>
              </DataList.Item>
              
              <DataList.Item>
                <DataList.Label minWidth="88px">
                  <Text
                    as="span"
                    size={detailTextSize}
                    weight="medium"
                    color="gray"
                  >
                    Species
                  </Text>
                </DataList.Label>
                <DataList.Value>
                  <Text as="span" size={detailTextSize}>
                    {character?.species ?? "-"}
                  </Text>
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">
                  <Text
                    as="span"
                    size={detailTextSize}
                    weight="medium"
                    color="gray"
                  >
                    Type
                  </Text>
                </DataList.Label>
                <DataList.Value>
                  <Text as="span" size={detailTextSize}>
                    {character?.type || "-"}
                  </Text>
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">
                  <Text
                    as="span"
                    size={detailTextSize}
                    weight="medium"
                    color="gray"
                  >
                    Gender
                  </Text>
                </DataList.Label>
                <DataList.Value>
                  <Text as="span" size={detailTextSize}>
                    {character?.gender ?? "-"}
                  </Text>
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">
                  <Text
                    as="span"
                    size={detailTextSize}
                    weight="medium"
                    color="gray"
                  >
                    Origin
                  </Text>
                </DataList.Label>
                <DataList.Value>
                  <RadixLink size={detailTextSize} href={character?.origin.url} target="_blank" rel="noreferrer">
                    {character?.origin.name ?? "-"}
                  </RadixLink>
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">
                  <Text
                    as="span"
                    size={detailTextSize}
                    weight="medium"
                    color="gray"
                  >
                    Location
                  </Text>
                </DataList.Label>
                <DataList.Value>
                  <RadixLink size={detailTextSize} href={character?.location.url} target="_blank" rel="noreferrer">
                    {character?.location.name ?? "-"}
                  </RadixLink>
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">
                  <Text
                    as="span"
                    size={detailTextSize}
                    weight="medium"
                    color="gray"
                  >
                    Episodes
                  </Text>
                </DataList.Label>
                <DataList.Value>
                  <Flex align="center" gap="2">
                    <Code variant="ghost" size="3">
                      {episodes.length}
                    </Code>
                  </Flex>
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">
                  <Text
                    as="span"
                    size={detailTextSize}
                    weight="medium"
                    color="gray"
                  >
                    Episode URLs
                  </Text>
                </DataList.Label>
                <DataList.Value>
                  {episodes.length > 0 ? (
                    <Flex align="center" gap="2" wrap="wrap">
                      {episodes.map((ep) => (
                        <RadixLink
                          key={ep}
                          href={ep}
                          target="_blank"
                          rel="noreferrer"
                          size={detailTextSize}
                        >
                          {getEpisodeLabel(ep)}
                        </RadixLink>
                      ))}
                    </Flex>
                  ) : (
                    <Text as="span" size={detailTextSize} color="gray">
                      -
                    </Text>
                  )}
                </DataList.Value>
              </DataList.Item>
              
              <DataList.Item>
                <DataList.Label minWidth="88px">
                  <Text
                    as="span"
                    size={detailTextSize}
                    weight="medium"
                    color="gray"
                  >
                    Created
                  </Text>
                </DataList.Label>
                <DataList.Value>
                  <Text as="span" size={detailTextSize}>
                    {createdAt}
                  </Text>
                </DataList.Value>
              </DataList.Item>
            </DataList.Root>
          </Box>
        </Card>
      </div>
    </div>
  );
}
