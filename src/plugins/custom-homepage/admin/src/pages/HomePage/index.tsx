import { Box, Typography, Flex, Layout, Grid, GridItem, Button } from "@strapi/design-system"
import { getFetchClient, useStrapiApp } from "@strapi/helper-plugin"
import React, { CSSProperties, useEffect, useState } from 'react';
import pluginId from '../../pluginId';
import { LiveChannel, User, Video } from "./interface";

const vodThumbnailStyle : CSSProperties = {
  width: 300,
  aspectRatio: "16/9"
}

const liveThumbnailStyle: CSSProperties = {
  width: 300,
  height: 300,
  overflow: "hidden",
  borderRadius: "100%",
}

const cardTitleStyle: CSSProperties = {
  fontSize: 19,
  width: "80%",
  textAlign: "left",
  fontWeight: 600,
  marginLeft: 0,
  marginTop: 0,
}


const LastLiveChanel = () => {
  const { get } : { get: (route: string) => Promise<any>} = getFetchClient()
  const [lastLive, setLastLive] = useState<LiveChannel | null>(null)
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");

  useEffect(() => {
      if (lastLive !== null) return
      (async () => {
        const lastVideoResponse = await get(`/${pluginId}/live`)
        const live = lastVideoResponse.data.results[0] as LiveChannel
        setLastLive(live);
        
      })()
  }, [])

  useEffect(() => {
    if (lastLive === null) return
    const thumbnail = lastLive!.thumbnail
    setThumbnailUrl(thumbnail.url);
  }, [lastLive])

  
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
    >
      <Flex direction="column" gap={8}>
        <Typography as="h2" variant="alpha">Your live Channels</Typography>
        <Box style={liveThumbnailStyle} shadow="tableShadow" background="neutral100">
          {thumbnailUrl != "" &&
            <img style={{overflow: "hidden", width: "100%"}} src={thumbnailUrl}/>
          }
        </Box>
        <Button>
          <Typography as="h4" >Manage your VODs</Typography>
        </Button>
      </Flex>
    </Box>
  )
}


const LastVod = () => {
  const { get } : { get: (route: string) => Promise<any>} = getFetchClient()
  const [lastVideo, setLastVideoId] = useState<Video | null>(null)
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");

  useEffect(() => {
      if (lastVideo !== null) return
      (async () => {
        const meResponse = await get(`/${pluginId}/me`);
        const me : User = meResponse.data;
        const lastVideoResponse = await get(`/${pluginId}/vod`)
        setLastVideoId(lastVideoResponse.data.results[0]);
      })()
  }, [])

  useEffect(() => {
    if (lastVideo === null) return
    const thumbnail = lastVideo!.Thumbnails[0]
    setThumbnailUrl(thumbnail.url);
  }, [lastVideo])

  
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
      <Typography style={cardTitleStyle} as="p">Last uploaded VOD</Typography>
      <Flex direction="column" gap={8} style={{marginTop: 30}}>
        <Typography as="h2" variant="alpha" style={{width: "100%", textAlign: "center"}}>Video name</Typography>
        <Typography>uploaded by</Typography>
        <Typography>mmazouz</Typography>
        <Box style={vodThumbnailStyle} shadow="tableShadeow" background="neutral100">
          {thumbnailUrl != "" &&
            <img style={{aspectRatio: "16/9", width: "100%"}} src={thumbnailUrl}/>
          }
        </Box>
        <Button>
          <Typography as="h4" >Manage your VODs</Typography>
        </Button>
      </Flex>
    </Box>
  )
}

const MostViewedVOD = () => {
  const { get } : { get: (route: string) => Promise<any>} = getFetchClient()
  const [lastVideo, setLastVideoId] = useState<Video | null>(null)
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");

  useEffect(() => {
      if (lastVideo !== null) return
      (async () => {
        const lastVideoResponse = await get(`/${pluginId}/vod`)
        setLastVideoId(lastVideoResponse.data.results[0]);
      })()
  }, [])

  useEffect(() => {
    if (lastVideo === null) return
    const thumbnail = lastVideo!.Thumbnails[0]
    setThumbnailUrl(thumbnail.url);
  }, [lastVideo])

  
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
    >
      <Flex direction="column" gap={8}>
        <Typography as="h2" variant="alpha">VOD content</Typography>
        <Box style={vodThumbnailStyle} shadow="tableShadow" background="neutral100">
          {thumbnailUrl != "" &&
            <img style={{aspectRatio: "16/9", width: "100%"}} src={thumbnailUrl}/>
          }
        </Box>
        <Button>
          <Typography as="h4" >Manage your VODs</Typography>
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
                  <Typography as="h1" variant="alpha">Welcome to your Trackflix CMS</Typography>
                </Flex>
              </Box>
            </GridItem>
          </Grid>
          <Flex direction="row" alignItems="center" justifyContent="center" gap={10}>
            <LastVod />
            <LastLiveChanel />
            <LastVod />
          </Flex>
      </Box>
    </Layout>
  );
};

export default HomePage;
