import {LayoutHome} from "../components/layout-home/layout-home";

export default function Mission() {
    return <h2>Mes missions</h2>;
}

Mission.getLayout = function getLayout(page) {
    return (
        <LayoutHome>
            {page}
        </LayoutHome>
    )
}
Mission.auth = true
