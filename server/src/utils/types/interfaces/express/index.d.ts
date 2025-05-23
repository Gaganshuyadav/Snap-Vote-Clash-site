
declare global{
    namespace Express{
        interface Request{
            user?: {
                userId: string,
                name: string,
                email: string,
                createdAt: Date,
                updatedAt: Date,
            }
        }
    }
}

export {};
