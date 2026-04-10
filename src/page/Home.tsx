import { Table } from "@radix-ui/themes/dist/cjs/components/index.js";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  Card,
  Flex,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { type Character } from "rickmortyapi";
import CustomBadge from "../components/CustomBadge";
import PaginationControls from "../components/PaginationControls.tsx";
import { type NavigationState } from "../types/NavigationState";

export default function Home() {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(() => {
    const state = (location.state ?? {}) as NavigationState;
    const restorePage = Number(state.page);
    return Number.isInteger(restorePage) && restorePage > 0 ? restorePage : 1;
  });
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500 );

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const params = new URLSearchParams();

        if (debouncedSearch.trim()) {
          params.set("name", debouncedSearch.trim());
        }

        params.set("page", String(page));

        const endpoint = `https://rickandmortyapi.com/api/character?${params.toString()}`;
        const response = await fetch(endpoint);
        const data = await response.json();

        if (response.ok && data?.results) {
          setCharacters(data.results);
          setTotalPages(data.info?.pages ?? 1);
        } else {
          setCharacters([]);
          setTotalPages(1);
        }
      } catch (err) {
        console.error("Error fetching characters:", err);
        setCharacters([]);
        setTotalPages(1);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [debouncedSearch, page]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [page]);

  return (
    <main>
      <div className="container">
        <Card className="banner" mb="20">
          {/* SRC: https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg */}
          <img
            src="/rickandmorty/Rick_and_Morty.svg"
            alt="Rick and Morty Logo"
            className="logo"
          />

          <Card className="search-container">
            <TextField.Root
              size={{ initial: "2", sm: "3" }}
              placeholder="Search by name…"
              className="search"
              onChange={handleChange}
            >
              <TextField.Slot>
                <MagnifyingGlassIcon height="18" width="18" />
              </TextField.Slot>
            </TextField.Root>
          </Card>
        </Card>

        <PaginationControls
            page={page}
            totalPages={totalPages}
            isLoading={isLoading}
            onPrevious={() => setPage((current) => Math.max(1, current - 1))}
            onNext={() => setPage((current) => Math.min(totalPages, current + 1))}
            style={{ marginBottom: "20px" }}
        />

        <Flex
          direction="column"
          align="center"
          justify="center"
          className="content"
        >
          <Table.Root
            variant="surface"
            className="table"
            size={{ initial: "1", sm: "2", md: "3" }}
          >
            <colgroup>
              <col style={{ width: "48px" }} />
              <col style={{ width: "auto" }} />
              <col style={{ width: "22%" }} />
              <col style={{ width: "84px" }} />
            </colgroup>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell className="cell-avatar">Avatar</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="cell-name">Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="cell-species">Species</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="cell-status" justify="end">Status</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {characters.length > 0 ? (
                characters.map((character) => (
                  <Table.Row key={character.id}>
                    <Table.Cell className="cell-avatar" width="min-content">
                      <Flex align="center" height="100%" width="min-content">
                        <Avatar
                          src={character.image}
                          alt={character.name}
                          radius="full"
                          className="avatar"
                          size={{ initial: "3", sm: "4", md: "5" }}
                          fallback={character.name.charAt(0)}
                        />
                      </Flex>
                    </Table.Cell>
                    <Table.Cell className="cell-name">
                      <Flex align="center" height="100%">
                        <Link
                          to={`/profile/${character.id}`}
                          state={{ page }}
                          onClick={scrollToTop}
                          className="profile-link"
                        >
                          <Heading
                            className="cell-name-text"
                            size={{ initial: "1", xs: "2", sm: "3", md: "4" }}
                          >
                            {character.name}
                          </Heading>
                        </Link>
                      </Flex>
                    </Table.Cell>
                    <Table.Cell className="cell-species">
                      <Flex align="center" height="100%">
                        <Text className="cell-species-text" size={{ initial: "1", xs: "1", sm: "2", md: "3" }}>
                          {character.species}
                        </Text>
                      </Flex>
                    </Table.Cell>
                    <Table.Cell className="cell-status">
                      <Flex align="center" justify="end" height="100%">
                        <CustomBadge
                          value={character.status}
                          kind="status"
                        />
                      </Flex>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={4} style={{ textAlign: "center" }}>
                    <Heading size={{ initial: "3", xs: "4", sm: "5", md: "6" }}>
                      {search.trim()
                        ? "No characters found."
                        : "No characters available."}
                    </Heading>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Root>

          <PaginationControls
            page={page}
            totalPages={totalPages}
            isLoading={isLoading}
            onPrevious={() => setPage((current) => Math.max(1, current - 1))}
            onNext={() => setPage((current) => Math.min(totalPages, current + 1))}
          />
        </Flex>
      </div>
    </main>
  );
}
