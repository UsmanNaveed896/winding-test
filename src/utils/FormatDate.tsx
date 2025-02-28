export default function FormatDate({ date, className }: {
    date: any,
    className?: string,
}) {

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const releaseDate: Date = new Date(date);
    
    return (
        <time dateTime={date} className={className}>
            {months[releaseDate.getMonth()] + ' ' + releaseDate.getDate() + ', ' + releaseDate.getFullYear()}
        </time>
    )
}