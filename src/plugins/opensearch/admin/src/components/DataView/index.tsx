import React, { FC, memo, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { request, useFetchClient, useNotification } from "@strapi/helper-plugin";
import { isObject } from "lodash";
import { Select } from "@buffetjs/core";
import { Divider,Button,Flex, Table, Thead, Tbody, Tr, Td, Th, Typography, Box  } from "@strapi/design-system";
import { LoadingBar } from "@buffetjs/styles";
import GlobalPagination from "./GlobalPagination";
import Wrapper from "./Wrapper";

interface DataViewProps {
  data: Array<any>;
  activeModel: any;
  loading: boolean;
  page: any;
  limit: any;
  totalCount: any;
  onChangeParams: (event: any) => void;
  isMigrateActive: boolean;
  isDeleted: boolean;
  isCreated: boolean;
  hasMapping: boolean;
  refreshData: () => void;
}

const LIMIT_OPTIONS: Array<string> = ["10", "20", "50", "100"];

const DataView: React.FC<DataViewProps> = ({
  data = [],
  activeModel = "",
  loading,
  page,
  limit,
  totalCount,
  onChangeParams,
  isMigrateActive,
  isDeleted,
  isCreated,
  refreshData,
}) => {
  const tableHeaders = useMemo(
    () =>
      data && data.length
        ? Object.keys(data[0]).map((d) => ({ name: d, value: d }))
        : [],
    [data]
  );

  const tableData = useMemo(
    () =>
      data && data.length
        ? data.map((dataObject) => {
            let newObj: any = {};
            if (!dataObject) return newObj;

            for (let key in dataObject) {
              if (isObject(dataObject[key])) {
                newObj[key] = JSON.stringify(dataObject[key], null, 2);
              } else {
                newObj[key] = dataObject[key];
              }
            }

            return newObj;
          })
        : [],
    [data]
  );

  const [isMigrating, setIsMigrating] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleNotification = useNotification();
  const { post} = useFetchClient();

  function isResponse(obj: any): obj is {
    success: boolean;
  } {
    return obj && typeof obj.success === 'boolean';
  }

  const migrate = async (model:any) => {
    setIsMigrating(true);
    try {
      const response = await post("/opensearch/migrate-model", {
        body: JSON.stringify({ model }),
        headers: { "Content-Type": "application/json" },
      });

      if (isResponse(response)) {
        if (response.success) {
          refreshData();
          toggleNotification({
            type: "success",
            message: `${model} model migrated successfully`,
          });
        } else {
          toggleNotification({
            type: "warning",
            message: "Migration failed",
          });
        }
      }
    } catch (error) {
      toggleNotification({
        type: "warning",
        message: "Migration failed",
      });
    } finally {
      setIsMigrating(false);
      refreshData();

    }
  };

  const deleteIndex = async (model:any) => {
    setIsDeleting(true);
    try {
      const response = await post("/opensearch/delete-index", {
        body: JSON.stringify({ model }),
        headers: { "Content-Type": "application/json" },
      });

      if (isResponse(response)) {
        if (response.success) {
          refreshData();
          toggleNotification({
            type: "success",
            message: `${model} index deleted`,
          });
        } else {
          toggleNotification({
            type: "warning",
            message: `cannot delete ${model} index`,
          });
        }
      }
    } catch (error) {
      toggleNotification({
        type: "warning",
        message: `cannot delete ${model} index`,
      });
    } finally {
      setIsDeleting(false);
      refreshData();
    }
  };

  const createIndex = async (model:any) => {
    setIsCreating(true);
    try {
      const response = await post("/opensearch/create-index", {
        body: JSON.stringify({ model }),
        headers: { "Content-Type": "application/json" },
      });

      refreshData();
      if (isResponse(response)) {
        if (response.success) {
          toggleNotification({
            type: "success",
            message: `${model} index created`,
          });
        } else {
          toggleNotification({
            type: "warning",
            message: `cannot create ${model} index`,
          });
        }
      }
    } catch (error) {
      toggleNotification({
        type: "warning",
        message: `cannot create ${model} index`,
      });
    } finally {
      setIsCreating(false);
      refreshData();
    }
  };

  return (
    <Wrapper>
      <Box style={{ padding: "10px 0" }}>
        <Typography variant="beta" padding={8}>
          {activeModel?.index?.toUpperCase()}
        </Typography>
      </Box>
      <Divider />
      <Box style={{ padding: "10px 0" }} background="neutral100">
        <Flex>
          <Flex style={{ flexGrow: "2" }}>
            <Button
              size="S"
              style={{ marginRight: "10px" }}
              variant="success"
              loading={isMigrating}
              onClick={() => {
                migrate(activeModel.model);
              }}
              disabled={!isMigrateActive}
            >
              import
            </Button>
            <Button
              size="S"
              style={{ marginRight: "10px" }}
              variant="secondary"
              loading={isCreating}
              onClick={() => {
                createIndex(activeModel.model);
              }}
              disabled={isCreated}
            >
              create index
            </Button>
            <Button
              size="S"
              style={{ marginRight: "10px" }}
              variant="danger"
              loading={isDeleting}
              onClick={() => {
                deleteIndex(activeModel.model);
              }}
              disabled={isDeleted}
            >
              delete index
            </Button>
          </Flex>
          <Box>
            <Flex style={{ alignItems: "center" }}>
              <Typography variant="omega" style={{ marginRight: "10px" }}>
                Entries per page:
              </Typography>
              <Select
                style={{
                  width: "fit-content",
                  height: "2.4rem",
                  fontSize: "1.0rem",
                }}
                name="params._limit"
                onChange={onChangeParams}
                options={LIMIT_OPTIONS}
                value={limit}
                className="col-2"
              />
            </Flex>
          </Box>
        </Flex>
      </Box>
      {!tableData.length && (
        <Box padding={8} style={{ background: "white" }}>
          <Typography variant="alfa" style={{ color: "black" }}>There is no data!</Typography>
        </Box>
      )}
      {loading ? (
        new Array(10).fill(0).map(() => (
          <>
            <LoadingBar />
            <div className="mt-3" />
          </>
        ))
      ) : (
        <>
          <Box style={{ padding: "10px 0" }} background="neutral100">
            <Table colCount={tableHeaders.length} rowCount={tableData.length}>
              <Thead>
                <Tr>
                  {tableHeaders.map((item) => (
                    <Th>
                      <Typography variant="sigma">{item.name}</Typography>
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {tableData.map((entry) => (
                  <Tr key={entry.id}>
                    {Object.keys(entry).map((item) => {
                      return (
                        <Td style={{ maxWidth: "20vw" }}>
                          <Typography textColor="neutral800" ellipsis>
                            {entry[item]}
                          </Typography>
                        </Td>
                      );
                    })}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          <Box>
            <GlobalPagination
              count={totalCount}
              onChangeParams={onChangeParams}
              params={{
                _limit: parseInt(limit || 10, 10),
                _page: page,
              }}
            />
          </Box>
        </>
      )}
    </Wrapper>
  );
};



export default DataView;
