import { DataProvider, HttpError } from "@refinedev/core";
import { ResponseRoot } from "./types";

const API_URL = "/api";

const fetcher = async (url: string, options?: RequestInit) => {
  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${localStorage.getItem("access_token") ?? ""}`,
    },
  });
};

export const dataProvider: DataProvider = {
  getList: async ({ resource, pagination, filters, sorters }) => {
    const params = new URLSearchParams();
    if (pagination) {
      params.append(
        "_start",
        (
          ((pagination?.current || 1) - 1) *
          (pagination?.pageSize ?? 0)
        ).toString()
      );
      params.append(
        "_end",
        ((pagination?.current || 1) * (pagination?.pageSize ?? 0)).toString()
      );
    }

    if (sorters && sorters.length > 0) {
      params.append("_sort", sorters.map((sorter) => sorter.field).join(","));
      params.append("_order", sorters.map((sorter) => sorter.order).join(","));
    }

    if (filters && filters.length > 0) {
      filters.forEach((filter) => {
        if ("field" in filter && filter.operator === "eq") {
          // Our fake API supports "eq" operator by simply appending the field name and value to the query string.
          // params.append(filter.field, filter.value);
          params.append("_filter", `${filter.field}:${filter.value}`);
        }
      });
    }

    const response = await fetcher(
      `${API_URL}/${resource}?${params.toString()}`
    );
    if (!response.ok) {
      const errorResponse = (await response.json()) as ResponseRoot;
      const error: HttpError = {
        message: errorResponse.Message,
        statusCode: errorResponse.Code,
      };
      return Promise.reject(error);
    }

    const data = (await response.json()) as ResponseRoot;
    if (!data.Succeeded) {
      const error: HttpError = {
        message: data.Message,
        statusCode: data.Code,
      };
      return Promise.reject(error);
    }
    const total = data.Data._total;
    return {
      data: data.Data._data,
      total,
    };
  },
  getOne: async ({ resource, id }) => {
    const response = await fetcher(`${API_URL}/${resource}/show/${id}`);
    if (!response.ok) {
      const errorResponse = (await response.json()) as ResponseRoot;
      const error: HttpError = {
        message: errorResponse.Message,
        statusCode: errorResponse.Code,
      };
      return Promise.reject(error);
    }
    const data = (await response.json()) as ResponseRoot;
    return { data: data.Data as any };
  },
  getMany: async ({ resource, ids }) => {
    const params = new URLSearchParams();

    if (ids) {
      ids.forEach((id) => params.append("id", String(id)));
    }

    const response = await fetcher(
      `${API_URL}/${resource}?${params.toString()}`
    );
    if (!response.ok) {
      const errorResponse = (await response.json()) as ResponseRoot;
      const error: HttpError = {
        message: errorResponse.Message,
        statusCode: errorResponse.Code,
      };
      return Promise.reject(error);
    }
    const data = (await response.json()) as ResponseRoot;
    return { data: data.Data as any };
  },
  create: async ({ resource, variables }) => {
    const response = await fetcher(`${API_URL}/${resource}`, {
      method: "POST",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorResponse = (await response.json()) as ResponseRoot;
      const error: HttpError = {
        message: errorResponse.Errors[0] || errorResponse.Message,
        statusCode: errorResponse.Code,
      };
      return Promise.reject(error);
    }
    const data = (await response.json()) as ResponseRoot;
    return { data: data.Data as any };
  },
  update: async ({ resource, id, variables }) => {
    const response = await fetcher(`${API_URL}/${resource}/${id}`, {
      method: "PUT",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorResponse = (await response.json()) as ResponseRoot;
      const error: HttpError = {
        message: errorResponse.Message,
        statusCode: errorResponse.Code,
      };
      return Promise.reject(error);
    }
    const data = (await response.json()) as ResponseRoot;
    return { data: data.Data as any };
  },
  deleteOne: async ({ resource, id }) => {
    const response = await fetcher(`${API_URL}/${resource}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorResponse = (await response.json()) as ResponseRoot;
      const error: HttpError = {
        message: errorResponse.Message,
        statusCode: errorResponse.Code,
      };
      return Promise.reject(error);
    }
    const data = (await response.json()) as ResponseRoot;
    return { data: data.Data as any };
  },
  getApiUrl: function (): string {
    throw new Error("Function not implemented.");
  },
};
