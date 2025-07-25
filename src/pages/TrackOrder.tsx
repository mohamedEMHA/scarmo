import InfoPage from '@/components/InfoPage';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const TrackOrder = () => {
  return (
    <InfoPage title="Track Order">
      <div className="space-y-4">
        <p className="text-center text-gray-700 dark:text-gray-300">
          Enter your order number below to track its status.
        </p>
        <div className="flex w-full max-w-sm items-center space-x-2 mx-auto">
          <Input type="text" placeholder="Order Number" />
          <Button type="submit">Track</Button>
        </div>
      </div>
    </InfoPage>
  );
};

export default TrackOrder;
