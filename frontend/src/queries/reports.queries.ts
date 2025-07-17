import { useEffect } from 'react';

import { useMutation } from '@tanstack/react-query';
import type { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';

import { API } from './axios.js';

async function requestReportGeneration(): Promise<void> {
  const response = await API.post('/reports/generate');

  if (response.status !== 200) {
    throw new Error(`Error generating report: ${response.statusText}`);
  }
}

function useRequestReportMutation(options?: UseMutationOptions<void, Error, void>): UseMutationResult<void, Error, void> {
  return useMutation({
    mutationFn: requestReportGeneration,
    ...options,
  });
}

async function downloadReport(): Promise<void> {
  const response = await API.get('/reports/download', { responseType: 'blob' });

  if (response.status !== 200) {
    throw new Error(`Error downloading report: ${response.statusText}`);
  }

  const link = document.createElement('a');
  link.href = URL.createObjectURL(response.data);
  link.download = 'relatório.csv';
  link.click();

  URL.revokeObjectURL(link.href);
};

function useDownloadReportMutation(options?: UseMutationOptions<void, Error, void>): UseMutationResult<void, Error, void> {
  return useMutation({
    mutationFn: downloadReport,
    ...options,
  });
}

interface SSEMessage {
  event: 'connected' | 'report_completed';
}

interface UseReportEventsOptions {
  onReportCompleted: () => void;
}

function useReportEvents(options: UseReportEventsOptions): void {
  useEffect(() => {
    const api = API.getUri();
    const sse = new EventSource(`${api}/reports/events`);

    sse.onmessage = (event) => {
      const data = JSON.parse(event.data) as SSEMessage;

      if (data.event === 'report_completed') {
        options.onReportCompleted();
      }
    };

    sse.onerror = (error) => {
      console.error('Error in SSE connection:', error);
      sse.close();
    };

    return () => {
      sse.close();
    };
  }, [options]);
}

export {
  useReportEvents,
  useRequestReportMutation,
  useDownloadReportMutation,
};
