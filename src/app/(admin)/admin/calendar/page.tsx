'use client';

import moment from 'moment';
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
// import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
// const DnDCalendar = withDragAndDrop(Calendar);

const events = [
  {
    id: 0,
    title: 'Board meeting',
    start: new Date(2024, 7, 24, 9, 0, 0),
    end: new Date(2024, 7, 24, 13, 0, 0),
    resourceId: 1,
  },
  {
    id: 1,
    title: 'MS training',
    allDay: true,
    start: new Date(2024, 7, 23, 14, 0, 0),
    end: new Date(2024, 7, 23, 16, 30, 0),
    resourceId: 2,
  },
  {
    id: 2,
    title: 'Team lead meeting',
    start: new Date(2024, 7, 23, 8, 30, 0),
    end: new Date(2024, 7, 23, 12, 30, 0),
    resourceId: [2, 3],
  },
  {
    id: 11,
    title: 'Birthday Party',
    start: new Date(2024, 7, 15, 7, 0, 0),
    end: new Date(2024, 7, 15, 10, 30, 0),
    resourceId: 4,
  },
];

const MyCalendar = () => {
  const localizer = React.useMemo(() => momentLocalizer(moment), []);
  const [myEvents, setEvents] = React.useState<any>(events);

  const handleSelectSlot = React.useCallback(
    ({ start, end }: any) => {
      const title = window.prompt('New Event Name');
      if (title) {
        setEvents((prev: any) => [...prev, { start, end, title }]);
      }
    },
    [setEvents],
  );

  const handleSelectEvent = React.useCallback((event: any) => window.alert(event.title), []);

  // const { defaultDate, scrollToTime } = React.useMemo(
  //   () => ({
  //     defaultDate: new Date(2015, 3, 12),
  //     scrollToTime: new Date(1970, 1, 1, 6),
  //   }),
  //   [],
  // );

  return (
    <Calendar
      dayLayoutAlgorithm='no-overlap'
      // defaultDate={defaultDate}
      // defaultView={Views.WEEK}
      // scrollToTime={scrollToTime}
      localizer={localizer}
      showMultiDayTimes
      events={myEvents}
      startAccessor='start'
      endAccessor='end'
      onSelectEvent={handleSelectEvent}
      onSelectSlot={handleSelectSlot}
      selectable
      style={{ height: 500 }}
      eventPropGetter={(event, start, end, isSelected) => {
        return console.log('event', event);
      }}
    />
  );
};

export default MyCalendar;
