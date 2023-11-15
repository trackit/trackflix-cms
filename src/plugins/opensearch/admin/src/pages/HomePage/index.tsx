import React, { useEffect, useState, memo, ChangeEvent } from "react";
import { Box,Flex} from "@strapi/design-system";
import DataView from "../../components/DataView";
import LeftMenu from "../../components/LeftMenu";
import { request, useFetchClient } from "@strapi/helper-plugin";
import axios from 'axios';

interface Model {
  index: string,

}


const INITIAL_PAGE: number = 1;
const INITIAL_LIMIT: string = "10";

const HomePage = () => {
  const [models, setModels] = useState<any[]>([]);
  const [activeModel, setActiveModel] = useState<any>({});
  const [modelData, setModelData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(INITIAL_PAGE);
  const [limit, setLimit] = useState<string>(INITIAL_LIMIT);
  const [totalCount, setTotalCount] = useState<string>("10");
  const [isCreated, setIsCreated] = useState<boolean>(true);
  const [isDeleted, setIsDeleted] = useState<boolean>(true);
  const [hasMapping, setHasMapping] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchMode, setSearchMode] = useState(false);

  const { get,post } = useFetchClient();

  const onChangeParams = ({ target }: ChangeEvent<HTMLInputElement>) => {
    switch (target.name) {
      case "params._page":
        setPage(Number(target.value));
        break;

      case "params._limit":
        setLimit(target.value);
        break;

      default:
        break;
    }
  };
  function isResponseObject(obj: any): obj is { status: { created: boolean; deleted: boolean; hasMapping: boolean }; data: any; total?: number } {
    return obj && obj.status && obj.data !== undefined;
  }

  const fetchData = async () => {
    if (activeModel && activeModel.index) {
      setLoading(true);
        request(
          `/opensearch/model?index=${activeModel.index}&_start=${page}&_limit=${limit}`,
          {
            method: "GET",
          }
        )
         .then((res) => {
        if (isResponseObject(res)) {
        setIsCreated(res.status.created);
        setIsDeleted(res.status.deleted);
        setHasMapping(res.status.hasMapping);
        setModelData(res.data);
        setTotalCount(res.total ? res.total.toString() : '10');
        }
      })
      .finally(() => setLoading(false));
  }
};

  useEffect(() => {
    const fetchDataAndModels = async () => {
      try {
        const { data: modelsData } = await get("/opensearch/models");
        setModels(modelsData);
        setActiveModel(modelsData[0]);
      } catch (error) {
        console.error("Request error:", error);
      }
    };

    fetchDataAndModels();
  }, []);

  const handleSearch = async () => {
    setSearchMode(true);
    setLoading(true);

    try {
      const response = await post("/opensearch/search-model", {
        body: JSON.stringify({
          index: activeModel.index,
          query: searchQuery,
          _start: page,
          _limit: limit,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (isResponseObject(response.data)) {
        setIsCreated(response.data.status.created);
        setIsDeleted(response.data.status.deleted);
        setHasMapping(response.data.status.hasMapping);
        setModelData(response.data.data);
        setTotalCount(response.data.total ? response.data.total.toString() : "10");
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (searchMode) {
      handleSearch(); // Call handleSearch when in searchMode
    } else {
      fetchData(); // Call fetchData when not in searchMode
    }
  }, [searchMode, activeModel, page, limit]);


  return (
    <Box>
      <Flex style={{ height: "100vh", alignItems: "baseline" }}>
        <LeftMenu
          models={models}
          activeModel={activeModel}
          setActiveModel={(model) => {
            setPage(INITIAL_PAGE);
            setLimit(INITIAL_LIMIT);
            setActiveModel(model);
          }}
        />
        <Box style={{ marginLeft: "16px" }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          style={{ marginRight: "8px" }}
        />
      </Box>
        <DataView
          data={modelData}
          refreshData={fetchData}
          activeModel={activeModel}
          loading={loading}
          page={page}
          limit={limit}
          onChangeParams={onChangeParams}
          totalCount={totalCount}
          isMigrateActive={!!activeModel?.migration}
          isCreated={isCreated}
          isDeleted={isDeleted}
          hasMapping={hasMapping}
        />
      </Flex>
    </Box>
  );
};

export default HomePage;
