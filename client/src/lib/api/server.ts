interface Body<TVariables> {
  query: string;
  variables?: TVariables;
}

interface Error{
  message:string
}

/**
 * Function that sends http request to the graphql api
 */
export const server = {
  fetch: async <TData = any, TVariables = any>(
    body: Body<TVariables>
  ) => { 
    const res = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });


    // Check if response is not a success and run
    if (!res.ok) {
      throw new Error("Failed to fetch froms server")
    }
    return res.json() as Promise<{ data: TData ,errors: Error[]}>;
  }
};
