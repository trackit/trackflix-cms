import { Box, Typography, Flex, Layout, Grid, GridItem, Button } from "@strapi/design-system"
import { getFetchClient } from "@strapi/helper-plugin"
import React, { CSSProperties, useEffect, useState } from 'react';
import pluginId from '../../pluginId';
import { LiveChannel, Video } from "./interface";

const vodThumbnailStyle : CSSProperties = {
  width: 300,
  aspectRatio: "16/9"
}

const liveThumbnailStyle: CSSProperties = {
  width: 280,
  height: 280,
  overflow: "hidden",
  borderRadius: "100%",
}

const cardTitleStyle: CSSProperties = {
  textAlign: "center",
}

const navigateCollectionType = (collectionType: 'vod' | 'live') => {
  const type = collectionType === 'vod' ? 'vod' : 'live-channel';
  window.location.href = `${window.location.origin}/admin/content-manager/collectionType/api::${type}.${type}`;
}

const LastLiveChanel = () => {
  const { get } : { get: (route: string) => Promise<any>} = getFetchClient()
  const [lastLive, setLastLive] = useState<LiveChannel | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");

  useEffect(() => {
      if (lastLive !== null) return;
      (async () => {
        const lastVideoResponse = await get(`/${pluginId}/live`);
        if (!lastVideoResponse?.data?.results || lastVideoResponse?.data?.results?.length <= 0) return;
        const live = lastVideoResponse.data.results[0] as LiveChannel;
        setLastLive(live);
      })()
  }, [])

  useEffect(() => {
    if (lastLive === null) return;
    const thumbnail = lastLive?.thumbnail;
    setThumbnailUrl(thumbnail?.url);
  }, [lastLive]);

  return (
    <Box
      as="aside"
      aria-labelledby="join-the-community"
      background="neutral0"
      hasRadius
      paddingRight={5}
      paddingLeft={5}
      paddingTop={6}
      paddingBottom={6}
      shadow="tableShadow"
      height={500}
    >
      <Flex direction="column" gap={8}>
        <Typography as="h2" variant="alpha">Live channel</Typography>
        <Box style={liveThumbnailStyle} shadow="tableShadow" background="neutral100">
          {thumbnailUrl &&
            <img style={{overflow: "hidden", width: "100%"}} src={thumbnailUrl}/>
          }
        </Box>
        <Button onClick={() => {
          navigateCollectionType('live');
        }}>
          <Typography as="h4" >Schedule a session</Typography>
        </Button>
      </Flex>
    </Box>
  )
}

const Separator = () => {
  return (
    <Box
      as="hr"
      style={{
        border: "none",
        height: 1,
        backgroundColor: "#e3e9f3",
        marginTop: 10,
        marginBottom: 10,
      }}
    />
  );
}

const VODContainer = ({ variant }: { variant: 'latest' | 'most-viewed' }) => {
  const { get } : { get: (route: string) => Promise<any>} = getFetchClient()
  const [video, setVideo] = useState<{
    name: string;
    thumbnail: string;
    views: number;
  } | null>(null);

  useEffect(() => {
    if (video !== null) return
    (async () => {
      const lastVideoResponse = await get(`/${pluginId}/vod`)
      const { results } = lastVideoResponse.data;
      if (!results || results.length <= 0) return;

      const getVideo = () => {
        switch (variant) {
          case 'latest':
            return results.reduce((prev: Video, current: Video) => {
              if (prev.createdAt < current.createdAt) {
                return current;
              }
              return prev;
            }, results[0]);
          case 'most-viewed':
            return results.reduce((prev: Video, current: Video) => {
              if (prev.views < current.views) {
                return current;
              }
              return prev;
            }, results[0]);
          default:
            return results[0];
        }
      }
      const video = getVideo();
      setVideo({
        name: video.Name,
        thumbnail: video.Thumbnails[0].url,
        views: video.views,
      });
    })()
  }, [video]);

  return (
    <Box
      as="aside"
      aria-labelledby="join-the-community"
      background="neutral0"
      hasRadius
      paddingRight={5}
      paddingLeft={5}
      paddingTop={4}
      paddingBottom={6}
      shadow="tableShadow"
      style={{position: "relative", width: 350}}
    >
      <Typography style={cardTitleStyle} as="h2" variant="alpha">{variant === 'latest' ? 'Latest VOD': 'Most viewed 🔥'}</Typography>
      <Separator />
      <Flex direction="column" gap={8} style={{marginTop: 30}}>
        <Flex direction="column" gap={1}>
          <Typography as="h2" variant="alpha" style={{width: "100%", textAlign: "center"}}>{video ? video.name : ""}</Typography>
          <Typography>by Author</Typography>
            {variant === 'most-viewed' &&
            <Typography variant="beta">{video ? `${video.views} view(s)` : ""}</Typography>
          }
        </Flex>
        <Box style={vodThumbnailStyle} shadow="tableShadeow" background="neutral100">
          {video?.thumbnail != "" &&
            <img style={{aspectRatio: "16/9", width: "100%"}} src={video?.thumbnail}/>
          }
        </Box>
        <Button onClick={() => {
          navigateCollectionType('vod');
        }}>
          <Typography as="h4" >Manage your VOD's</Typography>
        </Button>
      </Flex>
    </Box>
  )
}

const HomePage = () => {
  return (
    <Layout>
      <Box padding={10}>
          <Grid>
            <GridItem col={8} s={12}>
              <Box paddingLeft={6} paddingBottom={10}>
                <Flex direction="column" alignItems="flex-start" gap={5}>
                  <Typography as="h1" variant="alpha">Welcome to your Trackflix CMS 👋</Typography>
                  <Typography as="p" variant="epsilon" width="70%">
                    We hope you are making progress on your project! Feel free to read the latest news about Strapi.
                    We are giving our best to improve the product based on your feedback.
                  </Typography>
                </Flex>
              </Box>
            </GridItem>
          </Grid>
          <Flex direction="row" alignItems="stretch" justifyContent="center" gap={10}>
            <VODContainer variant="latest" />
            <LastLiveChanel />
            <VODContainer variant="most-viewed" />
          </Flex>
      </Box>
    </Layout>
  );
};

export default HomePage;
