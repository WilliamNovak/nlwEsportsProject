import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.rotes";

export function Routes() {
    return (
        <NavigationContainer>
            <AppRoutes />
        </NavigationContainer>
    )
}