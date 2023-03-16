import Button from '@/components/button/Button';
import RefreshIcon from '@/components/icons/RefreshIcon';

type InventoryViewAlertsErrorProps = {
  fetchViewAlerts: () => void;
};

function InventoryViewAlertsError({
  fetchViewAlerts
}: InventoryViewAlertsErrorProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex select-none items-center justify-between rounded-lg border border-black-170 p-6">
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-black-400">
              There was an error fetching the Slack alerts
            </p>
          </div>
        </div>
        <Button style="outline" size="sm" onClick={fetchViewAlerts}>
          <RefreshIcon width={16} height={16} />
          Try again
        </Button>
      </div>
    </div>
  );
}

export default InventoryViewAlertsError;
