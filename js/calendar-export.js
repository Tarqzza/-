// Calendar Export Utility: ICS generator, Google Calendar, Outlook Calendar links
const CalendarExport = {
  formatToICSDate(dateStr, timeStr) {
    const [year, month, day] = dateStr.split('-');
    const [hours, minutes] = timeStr.split(':');
    return `${year}${month}${day}T${hours}${minutes}00`;
  },

  downloadICS(booking, room) {
    const start = this.formatToICSDate(booking.date, booking.startTime);
    const end = this.formatToICSDate(booking.date, booking.endTime);
    const summary = booking.title || 'การจองห้องประชุม';
    const description = `หัวข้อ: ${booking.title}\\nผู้จอง: ${booking.organizer}\\nภาควิชา/หน่วยงาน: ${booking.department}\\nห้อง: ${room.name} (${room.building})\\nวัตถุประสงค์: ${booking.objective || '-'}\\nจำนวนผู้เข้าร่วม: ${booking.attendees} คน`;
    const location = `${room.name}, ${room.building}, คณะศิลปศาสตร์ มหาวิทยาลัยธรรมศาสตร์`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Faculty of Liberal Arts Thammasat University//Room Booking//TH',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:booking-${booking.id}-${Date.now()}@lartstu.ac.th`,
      `DTSTAMP:${this.formatToICSDate(new Date().toISOString().split('T')[0], '00:00')}Z`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `booking-${room.code || 'room'}-${booking.date}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  openGoogleCalendar(booking, room) {
    const start = this.formatToICSDate(booking.date, booking.startTime);
    const end = this.formatToICSDate(booking.date, booking.endTime);
    const text = encodeURIComponent(booking.title || 'การจองห้องประชุม');
    const details = encodeURIComponent(
      `ผู้จอง: ${booking.organizer} (${booking.department})\nห้อง: ${room.name} (${room.building})\nจำนวน: ${booking.attendees} คน\nรหัสอ้างอิง: ${booking.id}`
    );
    const location = encodeURIComponent(`${room.name}, ${room.building}, คณะศิลปศาสตร์ มหาวิทยาลัยธรรมศาสตร์`);

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}&location=${location}`;
    window.open(url, '_blank');
  },

  openOutlookCalendar(booking, room) {
    const start = `${booking.date}T${booking.startTime}:00`;
    const end = `${booking.date}T${booking.endTime}:00`;
    const subject = encodeURIComponent(booking.title || 'การจองห้องประชุม');
    const body = encodeURIComponent(
      `ผู้จอง: ${booking.organizer} (${booking.department})\nห้อง: ${room.name} (${room.building})\nรหัสอ้างอิง: ${booking.id}`
    );
    const location = encodeURIComponent(`${room.name}, ${room.building}, คณะศิลปศาสตร์ มหาวิทยาลัยธรรมศาสตร์`);

    const url = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${subject}&body=${body}&location=${location}&startdt=${start}&enddt=${end}`;
    window.open(url, '_blank');
  }
};