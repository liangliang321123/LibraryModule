import UpdateEmployee from "../Employee/UpdateEmployee";
import ViewLeave from "../Leave/ViewLeave";

const HomePageContent = (props) => {
    const { currentComp } = props;
    return (
        <div>
            {(() => {
                switch(currentComp)
                {
                    case 1:
                        return(
                            <UpdateEmployee/>
                        )
                    case 2:
                        return(
                            <ViewLeave/>
                        )
                }

            })()}
        </div>
    )
}
export default HomePageContent;