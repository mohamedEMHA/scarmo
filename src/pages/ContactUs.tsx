import InfoPage from '@/components/InfoPage';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const ContactUs = () => {
  return (
    <InfoPage title="Contact Us">
      <form className="space-y-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" placeholder="Your Name" />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Your Email" />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="message">Message</Label>
          <Textarea placeholder="Your Message" id="message" />
        </div>
        <Button type="submit" className="w-full">Submit</Button>
      </form>
    </InfoPage>
  );
};

export default ContactUs;
