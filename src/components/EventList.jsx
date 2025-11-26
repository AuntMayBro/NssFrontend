import { useState } from 'react';
import EventCard from './EventCard';
import { Button } from '@/components/ui/button';

const EventList = ({ events, showFilters = true }) => {
  const [filter, setFilter] = useState('all');

  const now = new Date();
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    if (filter === 'upcoming') return eventDate >= now;
    if (filter === 'past') return eventDate < now;
    return true;
  });

  return (
    <div className="space-y-8">
      {showFilters && (
        <div className="flex justify-center gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            All Events
          </Button>
          <Button
            variant={filter === 'upcoming' ? 'default' : 'outline'}
            onClick={() => setFilter('upcoming')}
          >
            Upcoming
          </Button>
          <Button
            variant={filter === 'past' ? 'default' : 'outline'}
            onClick={() => setFilter('past')}
          >
            Past Events
          </Button>
        </div>
      )}

      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No events found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;
