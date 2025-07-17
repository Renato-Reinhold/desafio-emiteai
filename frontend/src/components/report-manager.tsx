import { toast } from 'sonner';
import { useDownloadReportMutation, useReportEvents } from '../queries/reports.queries';

function ReportsManager(): null {
  const downloadReportMutation = useDownloadReportMutation();

  const onReportCompleted = () => {
    toast.info('Relatório disponível para download', {
      action: {
        label: 'Download',
        onClick: () => downloadReportMutation.mutate(),
      },
    })
  };

  useReportEvents({
    onReportCompleted,
  });

  return null;
}

export {
  ReportsManager,
};
