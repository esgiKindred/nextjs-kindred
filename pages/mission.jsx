import {LayoutHome} from "../components/layout-home/layout-home";
import Dashboard from "./index";

export default function Mission() {
    return <h2>Les missions</h2>;
}

Mission.getLayout = function getLayout(page) {
    return (
        <LayoutHome>
            {page}
        </LayoutHome>
    )
}