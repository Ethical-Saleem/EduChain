/* FullCalendar Types */
import { EventApi, EventInput } from "@fullcalendar/core";

/* Chart.js Types */
import { ChartData, ChartOptions } from "chart.js";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type InventoryStatus = "INSTOCK" | "LOWSTOCK" | "OUTOFSTOCK";

type Status = "DELIVERED" | "PENDING" | "RETURNED" | "CANCELLED";

export type LayoutType = "list" | "grid";
export type SortOrderType = 1 | 0 | -1;

export interface CustomEvent {
  name?: string;
  status?: "Ordered" | "Processing" | "Shipped" | "Delivered";
  date?: string;
  color?: string;
  icon?: string;
  image?: string;
}

interface ShowOptions {
  severity?: string;
  content?: string;
  summary?: string;
  detail?: string;
  life?: number;
}

export interface ChartDataState {
  barData?: ChartData;
  pieData?: ChartData;
  lineData?: ChartData;
  polarData?: ChartData;
  radarData?: ChartData;
}
export interface ChartOptionsState {
  barOptions?: ChartOptions;
  pieOptions?: ChartOptions;
  lineOptions?: ChartOptions;
  polarOptions?: ChartOptions;
  radarOptions?: ChartOptions;
}

export interface AppMailProps {
  mails: Demo.Mail[];
}

export interface AppMailSidebarItem {
  label: string;
  icon: string;
  to?: string;
  badge?: number;
  badgeValue?: number;
}

export interface AppMailReplyProps {
  content: Demo.Mail | null;
  hide: () => void;
}

declare namespace Demo {
  interface Task {
    id?: number;
    name?: string;
    description?: string;
    completed?: boolean;
    status?: string;
    comments?: string;
    attachments?: string;
    members?: Member[];
    startDate?: string;
    endDate?: string;
  }

  interface Member {
    name: string;
    image: string;
  }

  interface DialogConfig {
    visible: boolean;
    header: string;
    newTask: boolean;
  }

  interface Mail {
    id: number;
    from: string;
    to: string;
    email: string;
    image: string;
    title: string;
    message: string;
    date: string;
    important: boolean;
    starred: boolean;
    trash: boolean;
    spam: boolean;
    archived: boolean;
    sent: boolean;
  }

  interface Message {
    text: string;
    ownerId: number;
    createdAt: number;
  }

  type School = {
    id?: number | undefined;
    name?: string;
    description?: string;
    address?: string;
    city?: string;
    region?: string;
    postalCode?: string;
    contactName?: string;
    country?: string;
    telephone?: string;
    email?: string;
    dateFounded: Date | null;
    schoolType?: number;
    logoUrl?: string | StaticImport;
    [key: string]: string | number | null | Date | StaticImport
  };

  type NewSchool = {
    name?: string;
    address?: string;
    city?: string;
    region?: string;
    postalCode?: string;
    contactName?: string;
    country?: string;
    telephone?: string;
    email?: string;
    dateFounded: Date | null | undefined;
    // SchoolType?: number;
    logoUrl?: File | null;
    [key: string]: string | number | null | undefined | Date | File
  };

  type TokenModel = {
    accessToken: string;
    hasVerifiedEmail: boolean;
    roles: [string];
    school: School;
    user: User;
    userId: string;
    [key: string]: string | boolean | School | User
  }

  type FileDetail = {
    name: string;
    size: string;
    type: string;
    lastModified: number;
    objectURL: string;
  }

  interface User {
    id: number;
    name: string | null | undefined;
    schoolId: number;
    email: string | null | undefined;
    telephone: string | null | undefined;
    hasVerifiedEmail: boolean;
    userId: string;
    [key: string]: string | number | null | undefined
  }

  type NewUser = {
    name: string;
    email: string;
    telephone: string;
    password: string;
    schoolId: number;
    [key: string]: string | number
  }

  type Result = {
    id: number;
    schoolId?: number;
    studentNumber?: string;
    surname?: string;
    otherNames?: string;
    email?: string;
    phoneNumberOne?: string;
    phoneNumberTwo?: string;
    streetAddress?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    stateOfOrigin?: string;
    localGovernment?: string;
    age?: number;
    nin?: string;
    grade?: string;
    degree?: string;
    yearOfGrad?: Date | null | undefined;
    school?: School;
    [key: string]: string | number | null | undefined | Date | School
  }

  //ProductService
  type Product = {
    id?: string;
    code?: string;
    name: string;
    description: string;
    image?: string;
    price?: number;
    category?: string;
    quantity?: number;
    inventoryStatus?: InventoryStatus;
    rating?: number;
    orders?: ProductOrder[];
    [key: string]:
      | string
      | string[]
      | number
      | boolean
      | undefined
      | ProductOrder[]
      | InventoryStatus;
  };

  type ProductOrder = {
    id?: string;
    productCode?: string;
    date?: string;
    amount?: number;
    quantity?: number;
    customer?: string;
    status?: Status;
  };

  type Payment = {
    name: string;
    amount: number;
    paid: boolean;
    date: string;
  };

  //CustomerService
  type Customer = {
    id?: number;
    name?: string;
    country?: ICountryObject;
    company?: string;
    date: Date;
    status?: string;
    activity?: number;
    balance?: number | string;
    verified?: boolean;
    amount?: number;
    price?: number;
    rating?: number;
    image?: string;
    orders?: Demo.Customer[];
    inventoryStatus?: string;
    representative: {
      name: string;
      image: string;
    };
  };

  interface Event extends EventInput {
    location?: string;
    description?: string;
    tag?: {
      name: string;
      color: string;
    };
  }

  // PhotoService
  type Photo = {
    title: string;
    itemImageSrc?: string | undefined;
    thumbnailImageSrc?: string | undefined;
    alt?: string | undefined;
  };

  type Country = {
    name: string;
    code: string;
  };

  // IconService
  type Icon = {
    icon?: {
      paths?: string[];
      attrs?: [{}];
      isMulticolor?: boolean;
      isMulticolor2?: boolean;
      grid?: number;
      tags?: string[];
    };
    attrs?: [{}];
    properties?: {
      order?: number;
      id: number;
      name: string;
      prevSize?: number;
      code?: number;
    };
    setIdx?: number;
    setId?: number;
    iconIdx?: number;
  };
}
