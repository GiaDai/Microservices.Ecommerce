import { CALENDAR_EVENT_STYLE } from "../../components/calendarview/util"

const THEME_BG: { [key: string]: string } = CALENDAR_EVENT_STYLE;

const CalendarEventsBodyRightDrawer: React.FC<{ filteredEvents: any[] }> = ({ filteredEvents }) => {
    return (
        <>
            {
                filteredEvents.map((e, k) => {
                    return <div key={k} className={`grid mt-3 card  rounded-box p-3 ${THEME_BG[e.theme] || ""}`}>
                        {e.title}
                    </div>
                })
            }
        </>
    )
}

export default CalendarEventsBodyRightDrawer