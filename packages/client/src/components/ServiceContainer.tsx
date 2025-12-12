import { Grid, type GridProps } from "@mantine/core";
import { HowWeCanHelpCard } from "./ServiceCard";

export type Service = {
    title: string;
    description: string;
    icon: string;
}

export const ServiceContainer = (props: { services: Service[]; containerProps?: GridProps }) => {
    const { services, containerProps } = props;
    return (
        <Grid gutter={40} {...containerProps}>
            {services.map((service) => (
                <HowWeCanHelpCard key={service.title} service={service} />
            ))}
        </Grid>
    );
};