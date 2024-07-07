export type TaskT = {
    id: string;
    title: string;
    description: string;
    priority:string;
    deadline: number;
    image?: string;
    alt?: string;
    tags: { title: string; bg: string; text: string }[];
    startDate: string;
    estimateTime: number;
    endDate: string;
    actualTime: number;
    userId: number;
    owner: {
        id: number,
        userName: string,
        firstName: null,
        lastName: string,
        email: string,
        phoneNumber: null,
        role: number
      }
  };
  
  type Column = {
    name: string;
    items: TaskT[];
  };
  
  export type Columns = {
    [key: string]: Column;
  };
  