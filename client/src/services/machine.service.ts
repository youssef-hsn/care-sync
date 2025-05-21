export const getMachines = async (): Promise<any[]> => {
    return [
        {
            id: 1,
            name: "Machine 1",
            description: "Machine 1 description",
            price: 100,
            status: "active",
        },
        {
            id: 2,
            name: "Machine 2",
            description: "Machine 2 description",
            price: 200,
            status: "active",
        }
    ]
}