
const ListNotifications = (props) => {
    const { notifications } = props;
    //console.log(notifications)
    return (
        <div className="max-w-sm lg:max-w-md mt-4 mb-4 border-b font-play">
            <div className="flex space-x-2 items-center p-2">
                 {notifications.icon}
                 <div className="w-80 py-1">
                    <p className="text-sm">{notifications.title}</p>
                    <p className="text-[12px]">{notifications.dateTime} • {notifications.item}</p>
                 </div>
                 asdad
            </div>
        </div>
    )

}
export default ListNotifications