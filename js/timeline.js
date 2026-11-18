// Interactive Visual Timeline & Gantt Chart Components (Clean & Formal UI)
const TimelineComponent = {
  timeSlots: [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00"
  ],

  timeToMinutes(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  },

  minutesToTime(mins) {
    const h = Math.floor(mins / 60).toString().padStart(2, '0');
    const m = (mins % 60).toString().padStart(2, '0');
    return `${h}:${m}`;
  },

  getSlotStatus(roomId, date, slotTime, bookings, currentBookingId = null) {
    const slotMins = this.timeToMinutes(slotTime);

    for (const b of bookings) {
      if (b.roomId === roomId && b.date === date && b.id !== currentBookingId && b.status !== 'cancelled') {
        const bStart = this.timeToMinutes(b.startTime);
        const bEnd = this.timeToMinutes(b.endTime);

        if (slotMins >= bStart && slotMins < bEnd) {
          if (b.status === 'pending') return { status: 'pending', booking: b };
          return { status: 'booked', booking: b };
        }
      }
    }
    return { status: 'available', booking: null };
  },

  // Render the interactive booking slot picker
  renderSlotPicker(containerId, roomId, date, selectedStart, selectedEnd, bookings, onSelectRange) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    const startMins = selectedStart ? this.timeToMinutes(selectedStart) : null;
    const endMins = selectedEnd ? this.timeToMinutes(selectedEnd) : null;

    const wrapper = document.createElement('div');
    wrapper.className = 'grid grid-cols-4 sm:grid-cols-7 gap-2';

    this.timeSlots.slice(0, -1).forEach((slotTime) => {
      const slotMins = this.timeToMinutes(slotTime);
      const nextTime = this.minutesToTime(slotMins + 30);
      const slotInfo = this.getSlotStatus(roomId, date, slotTime, bookings);

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.dataset.time = slotTime;
      btn.dataset.nextTime = nextTime;

      let isSelected = false;
      if (startMins !== null && endMins !== null) {
        if (slotMins >= startMins && slotMins < endMins) {
          isSelected = true;
        }
      }

      let baseClasses = 'time-slot py-2 px-1.5 rounded-lg border text-xs text-center flex flex-col items-center justify-center ';
      let statusBadge = '';

      if (slotInfo.status === 'booked') {
        btn.className = baseClasses + 'slot-booked';
        statusBadge = '<span class="text-[10px] text-slate-400 mt-0.5">ติดจอง</span>';
        btn.disabled = true;
      } else if (slotInfo.status === 'pending') {
        btn.className = baseClasses + 'slot-pending';
        statusBadge = '<span class="text-[10px] text-amber-700 mt-0.5">รออนุมัติ</span>';
        btn.disabled = true;
      } else if (isSelected) {
        btn.className = baseClasses + 'slot-selected font-semibold';
        statusBadge = '<span class="text-[10px] text-blue-100 mt-0.5">เลือกแล้ว</span>';
      } else {
        btn.className = baseClasses + 'slot-available';
        statusBadge = '<span class="text-[10px] text-emerald-700 mt-0.5">ว่าง</span>';
      }

      btn.innerHTML = `
        <span class="font-mono font-semibold text-[11px]">${slotTime}-${nextTime}</span>
        ${statusBadge}
      `;

      if (slotInfo.status === 'available') {
        btn.addEventListener('click', () => {
          // No selection yet → start new selection
          if (!selectedStart) {
            onSelectRange(slotTime, nextTime);
            return;
          }

          const startM = this.timeToMinutes(selectedStart);
          const endM   = selectedEnd ? this.timeToMinutes(selectedEnd) : startM + 30;

          // Clicked inside selected range → reset (deselect)
          if (slotMins >= startM && slotMins < endM) {
            onSelectRange(null, null);
            return;
          }

          // Extending range: check no booked/pending slots block the path
          let newStart, newEnd;
          if (slotMins < startM) {
            // Extending backwards
            newStart = slotTime;
            newEnd   = selectedEnd || this.minutesToTime(startM + 30);
            // Verify no blocked slot between slotTime and selectedStart
            let blocked = false;
            for (let m = slotMins; m < startM; m += 30) {
              const t = this.minutesToTime(m);
              const info = this.getSlotStatus(roomId, date, t, bookings);
              if (info.status !== 'available') { blocked = true; break; }
            }
            if (blocked) { onSelectRange(slotTime, nextTime); return; }
          } else {
            // Extending forwards (slotMins >= endM)
            newStart = selectedStart;
            newEnd   = nextTime;
            // Verify no blocked slot between selectedEnd and nextTime
            let blocked = false;
            for (let m = endM; m <= slotMins; m += 30) {
              const t = this.minutesToTime(m);
              const info = this.getSlotStatus(roomId, date, t, bookings);
              if (info.status !== 'available') { blocked = true; break; }
            }
            if (blocked) { onSelectRange(slotTime, nextTime); return; }
          }

          onSelectRange(newStart, newEnd);
        });
      }

      wrapper.appendChild(btn);
    });

    container.appendChild(wrapper);
  },

  // Render Multi-Room Master Gantt Timeline for Admin
  renderAdminGantt(containerId, rooms, date, bookings, onBookingClick) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const startHour = 8;
    const endHour = 18;
    const totalHours = endHour - startHour;

    let html = `
      <div class="overflow-x-auto border border-slate-200 rounded-xl bg-white">
        <div class="min-w-[900px]">
          <!-- Header Row: Hours -->
          <div class="flex border-b border-slate-200 bg-slate-50 sticky top-0 z-10 text-xs font-semibold text-slate-600">
            <div class="w-52 p-3 shrink-0 border-r border-slate-200 flex items-center justify-between">
              <span>ห้องประชุม (${rooms.length} ห้อง)</span>
              <span class="text-[11px] text-slate-400 font-normal">ความจุ</span>
            </div>
            <div class="flex-1 grid grid-cols-10 divide-x divide-slate-200">
    `;

    for (let h = startHour; h < endHour; h++) {
      const hStr = h.toString().padStart(2, '0') + ':00';
      html += `<div class="p-2.5 text-center text-slate-500 font-mono text-xs">${hStr}</div>`;
    }

    html += `
            </div>
          </div>
          <!-- Body Rows: Rooms -->
          <div class="divide-y divide-slate-100">
    `;

    rooms.forEach(room => {
      const roomBookings = bookings.filter(b => b.roomId === room.id && b.date === date && b.status !== 'cancelled');

      html += `
        <div class="flex hover:bg-slate-50/70 transition-colors">
          <!-- Room Info Column -->
          <div class="w-52 p-3 shrink-0 border-r border-slate-200 flex flex-col justify-center">
            <div class="font-bold text-xs text-slate-900 truncate" title="${room.name}">
              ${room.name}
            </div>
            <div class="text-[11px] text-slate-500 flex items-center justify-between mt-1">
              <span class="truncate pr-1">${room.campusName}</span>
              <span class="bg-slate-100 px-1.5 py-0.5 rounded text-[10px] font-medium text-slate-600 shrink-0">${room.capacity} ที่นั่ง</span>
            </div>
          </div>

          <!-- Timeline Grid Area -->
          <div class="flex-1 relative h-16 bg-white flex items-center">
            <div class="absolute inset-0 grid grid-cols-10 divide-x divide-slate-100 pointer-events-none">
              <div class="h-full"></div><div class="h-full"></div><div class="h-full"></div>
              <div class="h-full"></div><div class="h-full"></div><div class="h-full"></div>
              <div class="h-full"></div><div class="h-full"></div><div class="h-full"></div>
              <div class="h-full"></div>
            </div>
      `;

      roomBookings.forEach(b => {
        const bStartMins = TimelineComponent.timeToMinutes(b.startTime);
        const bEndMins = TimelineComponent.timeToMinutes(b.endTime);
        const dayStartMins = startHour * 60;
        const totalDayMins = totalHours * 60;

        const leftPercent = Math.max(0, ((bStartMins - dayStartMins) / totalDayMins) * 100);
        const widthPercent = Math.min(100 - leftPercent, ((bEndMins - bStartMins) / totalDayMins) * 100);

        let bgStyle = 'bg-slate-800 text-white border-slate-900';
        let statusTag = '';
        if (b.status === 'pending') {
          bgStyle = 'bg-amber-600 text-white border-amber-700';
          statusTag = '[รออนุมัติ] ';
        } else if (b.status === 'checked_in' || b.status === 'confirmed') {
          bgStyle = 'bg-emerald-700 text-white border-emerald-800';
        }

        const serviceTags = [];
        if (b.catering && b.catering.required) serviceTags.push('อาหาร');
        if (b.equipment && b.equipment.required) serviceTags.push('โสตฯ');

        html += `
          <div 
            class="absolute top-2 bottom-2 rounded-md px-2.5 py-1 text-xs cursor-pointer border flex items-center justify-between gantt-booking-chip ${bgStyle}"
            style="left: ${leftPercent}%; width: ${widthPercent}%; min-width: 70px;"
            title="${b.title} (${b.startTime}-${b.endTime}) โดย ${b.organizer}"
            onclick="App.showBookingDetails('${b.id}')"
          >
            <div class="truncate font-medium flex items-center gap-1.5">
              <span class="font-mono text-[11px] opacity-90">${statusTag}${b.startTime}-${b.endTime}</span>
              <span class="truncate font-semibold">${b.title}</span>
            </div>
            ${serviceTags.length > 0 ? `
              <span class="text-[10px] bg-black/20 px-1.5 py-0.5 rounded shrink-0 ml-1.5">
                ${serviceTags.join('/')}
              </span>
            ` : ''}
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;
    });

    html += `
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
  },

  // Render Heatmap Matrix (Day of week vs Hour)
  renderHeatmap(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const days = ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์'];
    const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

    const sampleHeatmapData = [
      [35, 75, 90, 85, 40, 70, 88, 92, 60, 25],
      [40, 80, 95, 90, 45, 85, 95, 90, 70, 30],
      [30, 85, 90, 80, 35, 90, 92, 85, 65, 20],
      [50, 90, 98, 95, 50, 92, 95, 90, 75, 40],
      [25, 65, 80, 70, 30, 60, 70, 50, 35, 15]
    ];

    let html = `
      <div class="overflow-x-auto">
        <div class="min-w-[650px]">
          <div class="grid grid-cols-11 gap-1.5 text-center text-xs font-semibold text-slate-500 mb-2">
            <div class="text-left font-bold text-slate-700">วัน / เวลา</div>
            ${hours.map(h => `<div class="font-mono">${h}</div>`).join('')}
          </div>
    `;

    days.forEach((day, dIdx) => {
      html += `
        <div class="grid grid-cols-11 gap-1.5 items-center mb-1.5">
          <div class="text-xs font-semibold text-slate-700 text-left">${day}</div>
      `;

      hours.forEach((h, hIdx) => {
        const val = sampleHeatmapData[dIdx][hIdx];
        let colorClass = 'bg-slate-100 text-slate-600';
        if (val >= 90) colorClass = 'bg-red-800 text-white font-semibold';
        else if (val >= 75) colorClass = 'bg-red-600 text-white font-medium';
        else if (val >= 50) colorClass = 'bg-amber-200 text-amber-950 font-medium';
        else if (val >= 30) colorClass = 'bg-slate-200 text-slate-800';
        else colorClass = 'bg-slate-100 text-slate-500';

        html += `
          <div 
            class="h-9 rounded flex items-center justify-center text-xs font-mono heatmap-cell cursor-default ${colorClass}"
            title="วัน${day} เวลา ${h} น. - อัตราการใช้งาน ${val}%"
          >
            ${val}%
          </div>
        `;
      });

      html += `</div>`;
    });

    html += `
          <div class="flex flex-wrap items-center justify-end gap-4 mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600">
            <span class="font-medium text-slate-500">ระดับความหนาแน่น:</span>
            <div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-slate-100 border border-slate-200"></span> ต่ำกว่า 30%</div>
            <div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-slate-200"></span> 30 - 49%</div>
            <div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-amber-200"></span> 50 - 74%</div>
            <div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-red-600"></span> 75 - 89%</div>
            <div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-red-800"></span> 90% ขึ้นไป (หนาแน่นสูงสุด)</div>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
  }
};