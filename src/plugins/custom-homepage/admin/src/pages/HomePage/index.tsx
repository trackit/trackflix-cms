import { Box, Typography, Flex, Layout, Grid, GridItem, Button } from '@strapi/design-system'
import { useFetchClient } from '@strapi/helper-plugin'
import React, { CSSProperties, useEffect, useState } from 'react';
import { LiveChannel } from './interface';

const vodThumbnailStyle : CSSProperties = {
  width: 300,
  aspectRatio: '16/9'
}

const liveThumbnailStyle: CSSProperties = {
  width: 280,
  height: 280,
  overflow: 'hidden',
  borderRadius: '100%',
}

const cardTitleStyle: CSSProperties = {
  textAlign: 'center',
}

enum CollectionType {
  Vod = 'vod',
  Live = 'live-channel',
}

enum VODSortAttribute {
  Latest = 'createdAt',
  MostViewed = 'views',
}

const getUrl = (type: CollectionType, sortAttribute?: VODSortAttribute) =>
  `/content-manager/collection-types/api::${type}.${type}?sort=${sortAttribute}:desc&_limit=1`;

const navigateCollectionType = (type: CollectionType) => {
  window.location.href = `${window.location.origin}/admin/${getUrl(type)}`;
}

const LastLiveChanel = () => {
  const { get }  = useFetchClient()
  const [lastLive, setLastLive] = useState<LiveChannel | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');

  useEffect(() => {
    const fetchThumbnail = async () => {
      const endpoint = getUrl(CollectionType.Live, VODSortAttribute.Latest);
      const lastLive = await get(endpoint);
      if (!lastLive?.data?.results || lastLive?.data?.results?.length <= 0) return;
      setLastLive(lastLive.data.results[0] as LiveChannel);
    }
    if (lastLive === null)
      fetchThumbnail();
  });

  useEffect(() => {
    if (lastLive === null) return;
    const thumbnail = lastLive?.thumbnail;
    setThumbnailUrl(thumbnail?.url);
  }, [lastLive]);

  return (
    <Box
      as='aside'
      aria-labelledby='join-the-community'
      background='neutral0'
      hasRadius
      paddingRight={5}
      paddingLeft={5}
      paddingTop={6}
      paddingBottom={6}
      shadow='tableShadow'
      height={500}
    >
      <Flex direction='column' gap={8}>
        <Typography as='h2' variant='alpha'>Live channel</Typography>
        <Box style={liveThumbnailStyle} shadow='tableShadow' background='neutral100'>
          {thumbnailUrl &&
            <img style={{overflow: 'hidden', width: '100%'}} src={thumbnailUrl}/>
          }
        </Box>
        <Button onClick={() => { navigateCollectionType(CollectionType.Live) }} >
          <Typography as='h4'>Schedule a session</Typography>
        </Button>
      </Flex>
    </Box>
  )
}

const Separator = () => {
  return (
    <Box
      as='hr'
      style={{
        border: 'none',
        height: 1,
        backgroundColor: '#e3e9f3',
        marginTop: 10,
        marginBottom: 10,
      }}
    />
  );
}

const VODContainer = ({ sortAttribute }: { sortAttribute: VODSortAttribute }) => {
  const { get } = useFetchClient()
  const [video, setVideo] = useState<{
    name: string;
    thumbnail: string;
    views: number;
  } | null>(null);

  useEffect(() => {
    const fetchVod = async () => {
      const endpoint = getUrl(CollectionType.Vod, sortAttribute);
      console.log(endpoint)
      const lastVideoResponse = await get(endpoint);
      const { results } = lastVideoResponse.data;
      console.log(sortAttribute, results);
      if (!results || results?.length === 0) return;

      setVideo({
        name: results[0].Name,
        thumbnail: results[0].Thumbnails[0]?.url,
        views: results[0].views,
      });
    }
    if (video === null)
      fetchVod();
  });

  return (
    <Box
      as='aside'
      aria-labelledby='join-the-community'
      background='neutral0'
      hasRadius
      paddingRight={5}
      paddingLeft={5}
      paddingTop={4}
      paddingBottom={6}
      shadow='tableShadow'
      style={{ position: 'relative', width: 350 }}
    >
      <Typography style={cardTitleStyle} as='h2' variant='alpha'>
        {sortAttribute === VODSortAttribute.Latest ? 'Latest VOD': 'Most viewed 🔥'}
      </Typography>
      <Separator />
      <Flex direction='column' gap={8} style={{marginTop: 30}}>
        <Flex direction='column' gap={1}>
          <Typography as='h2' variant='alpha' style={{width: '100%', textAlign: 'center'}}>
            {video ? video.name : ''}
          </Typography>
          <Typography>by Author</Typography>
            {sortAttribute === VODSortAttribute.MostViewed &&
              <Typography variant='beta'>{video ? `${video.views} view(s)` : ''}</Typography>
            }
        </Flex>
        <Box style={vodThumbnailStyle} shadow='tableShadeow' background='neutral100'>
          {video?.thumbnail != '' &&
            <img style={{aspectRatio: '16/9', width: '100%'}} src={video?.thumbnail}/>
          }
        </Box>
        <Button
          onClick={() => { navigateCollectionType(CollectionType.Vod) }}
        >
          <Typography as='h4'>Manage your VOD's</Typography>
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
                <Flex direction='column' alignItems='flex-start' gap={5}>
                  <Typography as='h1' variant='alpha'>Welcome to your Trackflix CMS 👋</Typography>
                  <Typography as='p' variant='epsilon' width='70%'>
                    We hope you are making progress on your project! Feel free to read the latest news about Strapi.
                    We are giving our best to improve the product based on your feedback.
                  </Typography>
                </Flex>
              </Box>
            </GridItem>
          </Grid>
          <Flex direction='row' alignItems='stretch' justifyContent='center' gap={10}>
            <VODContainer sortAttribute={VODSortAttribute.Latest} />
            <LastLiveChanel />
            <VODContainer sortAttribute={VODSortAttribute.MostViewed} />
          </Flex>
      </Box>
    </Layout>
  );
};

export default HomePage;