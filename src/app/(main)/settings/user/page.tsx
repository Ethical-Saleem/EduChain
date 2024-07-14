"use client";

import React, { useState, useRef, useEffect } from "react";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { ToastContainer, toast } from "react-toastify";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { getCookie } from "@/app/utils/cookies";
import { Demo } from "../../../../../types";
import { AccountService } from "@/app/services/AccountService";
import { AuthenticationService } from "@/app/services/AuthenticationService";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Password } from "primereact/password";

const UserSetting = () => {
  const emptyUserData: Demo.NewUser = {
    name: "",
    email: "",
    telephone: "",
    password: "",
    schoolId: 0,
  };
  const [users, setUsers] = useState([] as Demo.User[]);
  const [newUserData, setNewUserData] = useState<Demo.NewUser>(emptyUserData);
  const [currentUser, setCurrentUser] = useState<Demo.TokenModel | null>(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [newUser, setNewUser] = useState({} as Demo.NewUser);
  const [createModal, setCreateModal] = useState(false);
  const dt = useRef<DataTable<any>>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = getCookie("currentUser");
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser) {
        setCurrentUser(parsedUser);
        dispatchFetchUsers(parsedUser?.school.id);
      }
    }
  }, []);

  const openDialog = () => {
    setCreateModal(true)
  }
  const closeDialog = () => {
    setCreateModal(false)
  }

  const dispatchFetchUsers = (id: number | undefined) => {
    setLoading(true);
    AccountService.fetchUsers(id).then(
      (data) => {
        setUsers(data);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        console.log("fetch-error", error);
      }
    );
  };

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await AuthenticationService.registerUser(newUserData);
      console.log(res);
      if (res) {
        toast.success("User created successfully");

        dispatchFetchUsers(currentUser?.school.id);
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(`Error: ${error}`);
    }
  };

  const onInputUserChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => {
    const val = (e.target && e.target.value) || "";
    let _data = { ...newUserData };
    _data[`${name}`] = val;

    setNewUserData(_data);
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button
            label="Create new user"
            icon="pi pi-plus"
            severity="success"
            onClick={openDialog}
            className=" mr-2"
          />
        </div>
      </React.Fragment>
    );
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Manage Users</h5>

      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.currentTarget.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  return (
    <div className="grid">
      <div className="col-12">
        <ToastContainer />
        <Toolbar className="mb-4" end={rightToolbarTemplate} />
        <DataTable
          ref={dt}
          value={users}
          selection={selectedUsers}
          onSelectionChange={(e) => setSelectedUsers(e.value as any)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          className="datatable-responsive"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Records"
          globalFilter={globalFilter}
          emptyMessage="No records found."
          header={header}
          loading={loading}
          responsiveLayout="scroll"
        >
          <Column
            field="name"
            header="USERNAME"
            sortable
            headerStyle={{ minWidth: "15rem" }}
          ></Column>
          <Column
            field="email"
            header="EMAIL"
            sortable
            headerStyle={{ minWidth: "15rem" }}
          ></Column>
          <Column
            field="telephone"
            header="TELEPHONE"
            sortable
            headerStyle={{ minWidth: "15rem" }}
          ></Column>
        </DataTable>

        <Dialog
          visible={createModal}
          style={{ width: "450px" }}
          modal
          header="New User Creation"
          onHide={closeDialog}
        >
          <form onSubmit={createUser} className="flex flex-col">
            <div className="formgrid grid form-inputs md:overflow-y-auto md:max-h-[50vh] mb-2">
              <div className="field col-12">
                <label
                  htmlFor="name"
                  className="block text-900 text-base font-medium mb-2"
                >
                  UserName
                </label>
                <InputText
                  id="name"
                  placeholder="School Name"
                  className="w-full mb-2 p-2 bg-gray-200"
                  onChange={(e) => onInputUserChange(e, "name")}
                  value={newUserData.name}
                />
              </div>
              <div className="field col-12">
                <label
                  htmlFor="email1"
                  className="block text-900 text-basebase font-medium mb-2"
                >
                  Email
                </label>
                <InputText
                  id="email1"
                  type="text"
                  placeholder="Email address"
                  className="w-full p-2 bg-gray-200 mb-2"
                  onChange={(e) => onInputUserChange(e, "email")}
                  value={newUserData.email}
                />
              </div>
              <div className="field col-12 md:col-6">
                <label
                  htmlFor="name"
                  className="block text-900 text-basebase font-medium mb-2"
                >
                  Telephone
                </label>
                <InputText
                  id="telephone"
                  placeholder="Telephone"
                  className="w-full p-2 bg-gray-200 mb-2"
                  onChange={(e) => onInputUserChange(e, "telephone")}
                  value={newUserData.telephone}
                />
              </div>
              <div className="field col-12">
                <label
                  htmlFor="password1"
                  className="block text-900 font-medium text-basebase mb-2"
                >
                  Default Password
                </label>
                <Password
                  inputId="password1"
                  value={newUserData.password}
                  onChange={(e) => onInputUserChange(e, "password")}
                  placeholder="Password"
                  toggleMask
                  className="w-full mb-2"
                  inputClassName="w-full p-2 bg-gray-200"
                ></Password>
              </div>
            </div>
            <div className="md:mt-3 text-center">
              <Button
                label="Continue"
                className="w-full bg-[#245763] text-white p-2 md:p-3 hover:bg-[#061a2b]"
                loading={loading}
                type="submit"
              ></Button>
            </div>
          </form>
        </Dialog>
      </div>
    </div>
  );
};

export default UserSetting;
