import ApplicationList from '@/components/applications/ApplicationList';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import NewApplicationModal from '@/components/NewApplicationModal';

export function ApplicationsPage() {
  const [open, setOpen] = useState(false);

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Applications
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
          Manage your career journey and track prospects
        </p>
        <Button
          onClick={() => setOpen(true)}
          className="bg-[#0040a1] hover:bg-[#003080] text-white"
        >
          + Add Application
        </Button>
        <NewApplicationModal open={open} onOpenChange={setOpen} />
      </div>

      <ApplicationList />
    </section>
  );
}
