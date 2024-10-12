import { Button } from '@/components/ui/button';

const ButtonsPage = () => {
  return (
    <div className="flex flex-col max-w-[200px] space-y-4 p-4">
      <Button>Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="primaryOutline">PrimaryOutline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="secondaryOutline">SecondaryOutline</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="dangerOutline">DangerOutline</Button>
      <Button variant="super">Danger</Button>
      <Button variant="superOutline">DangerOutline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="sidebar">Sidebar</Button>
      <Button variant="sidebarOutline">SidebarOutline</Button>
    </div>
  );
};

export default ButtonsPage;
