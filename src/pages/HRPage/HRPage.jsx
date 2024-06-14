import React, { useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';
import CustomizedContent from './components/CustomizedContent';

import * as Campaign from '../../service/Campaign';
import * as JobsService from '../../service/JobsService';
import { Typography } from 'antd';

const HRPage = () => {
  const getAllCampaigns = async () => {
    const res = await Campaign.fetchCampaigns();
    console.log('Campaigns data:', res);
    return { data: res?.events || [], key: 'campaign' };
  };

  const getAllJobs = async () => {
    const res = await JobsService.fetchJobs();
    console.log('Jobs data:', res);
    return { data: res?.events || [], key: 'jobs' };
  };

  const queries = useQueries({
    queries: [
      { queryKey: ['jobs'], queryFn: getAllJobs, staleTime: 1000 * 60 },
      { queryKey: ['campaign'], queryFn: getAllCampaigns, staleTime: 1000 * 60 }
    ]
  });

  console.log('Queries:', queries);

  const memoCount = useMemo(() => {
    const result = {};
    try {
      if(queries) {
        queries.forEach((query) => {
          result [query?.data?.key] = query?.data?.data?.length
        })
      }
    } catch (error) {
      console.error('Error processing queries:', error);
    }
    return result;
  }, [queries]);

  const COLORS = {
    jobs: ['#e66465', '#9198e5'],
    campaign: ['#a8c0ff', '#3f2b96']
  };

  console.log('memoCount', memoCount);

  return (
    <div style={{display:'flex',flexDirection:'column',textAlign:'center',justifyItems:'center',justifyContent:'center'}}>
      <Typography.Title level={20}>Chào mừng quay trở lại HR MANAGEMENT System</Typography.Title>
    <div style={{ display: 'flex', overflowX: 'hidden' }}>
    
      <div style={{ flex: 1, padding: '15px 0 15px 15px' }}>
       
        <CustomizedContent data={memoCount} colors={COLORS} />
    
      </div>
    </div>
    </div>
  );
};

export default HRPage;
