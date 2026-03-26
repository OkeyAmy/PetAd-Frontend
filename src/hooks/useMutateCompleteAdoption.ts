import { useApiMutation } from "./useApiMutation";
import { useQueryClient } from "@tanstack/react-query";
import { adoptionService } from "../api/adoptionService";

export function useMutateCompleteAdoption(adoptionId: string) {
    const queryClient = useQueryClient();

    const { mutate, isPending, isError, error } = useApiMutation<void, string>(
        (id: string) => adoptionService.completeAdoption(id),
        {
            invalidates: [["adoption", adoptionId]],
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["adoption", adoptionId] });
            },
        },
    );

    return {
        mutateCompleteAdoption: () => mutate(adoptionId),
        isPending,
        isError,
        error,
    };
}