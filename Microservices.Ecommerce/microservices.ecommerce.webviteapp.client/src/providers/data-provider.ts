import { DataProvider, HttpError } from "@refinedev/core";
import { ResponseManyRoot, ResponseRoot } from "./types";
import { authProvider } from "./auth-provider";

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

    if (response.status === 401) {
      await authProvider.refresh();
      const error: HttpError = {
        message: response.statusText,
        statusCode: response.status,
      };
      return Promise.reject(error);
    } else if (response.ok) {
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
    } else {
      const errorResponse = (await response.json()) as ResponseRoot;
      const error: HttpError = {
        message: errorResponse.Message,
        statusCode: errorResponse.Code,
      };
      return Promise.reject(error);
    }
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
    if (ids && ids.length > 0) {
      ids.forEach((id) => params.append("id", String(id)));
      const response = await fetcher(
        `${API_URL}/${resource}?${params.toString()}`
      );
      if (!response.ok) {
        const errorResponse = (await response.json()) as ResponseManyRoot;
        const error: HttpError = {
          message: errorResponse.Message,
          statusCode: errorResponse.Code,
        };
        return Promise.reject(error);
      } else {
        const data = (await response.json()) as ResponseManyRoot;
        return { data: data.Data as any[] };
      }
    }
    return { data: [] };
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
        message: errorResponse.Errors.join(" ") || errorResponse.Message,
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
