import { useEffect, useState } from "react"
import { delAdmins, delCategories, getAdmin, getAdmins, getCategories, getYear } from "../../../Gets"
import Profile from "../../templates/Profile"
import AdminField from "./fields/Admin"
import CategoryField from "./fields/Category"
import FAQsField from "./fields/FAQs"
import OrganizeField from "./fields/Organize"
import PostField from "./fields/Post"
import PresidentField from "./fields/President"
import ThesisesField from "./fields/Thesises"
import VisMissField from "./fields/VisMiss"

function Admin() {

  const [Name, setName] = useState(null)
  const [Email, setEmail] = useState(null)
  const [Categories, setCategories] = useState(null)
  const [Admins, setAdmins] = useState(null)
  const [Year, setYear] = useState(null)

  useEffect(() => {

    if (localStorage.getItem('admin') && localStorage.getItem('id_admin')) {
      getAdmin().then(a => {
        setName(a.data[0].name)
        setEmail(a.data[0].email)
      })
    } else if (!localStorage.getItem('admin')) {
      return null
    }

    getCategories().then(a => setCategories(a.data))
    getAdmins().then(a => setAdmins(a.data))
    getYear().then(a => setYear(a.data))

  }, [])

  const props = {
    name: Name,
    email: Email,
    category: Categories,
    admin: Admins
  }

  return (
    <>
      <div className="flex gap-8 md:w-[90%] md:px-0 w-full lg:flex-row flex-col mx-auto lg:my-10 my-4">
        <div className="flex flex-col relative lg:px-8 px-4 py-4 bg-white shadow rounded-xl w-[100%] h-max dark:bg-[#222222]">
          <div className="flex text-2xl justify-between items-center pb-4 border-b">
            <h1 className="text-teal-600"># Admin Panel</h1>
            <p onClick={() => document.querySelector('.profile').classList.toggle('scale-0')} className="text-lg text-teal-600 hover:text-teal-700 cursor-pointer"><i className="dark:text-slate-200 text-slate-900 fa fa-angle-down mr-1"></i> Admin</p>
          </div>
          <div className="absolute lg:right-8 right-4 top-20 md:mx-0 text-[#222222] scale-0 transition duration-500 profile">
            <Profile {...props} />
          </div>

          <PostField {...props} />

          <PresidentField />

          <OrganizeField />


          <div className="flex flex-col lg:flex-row lg:justify-between mb-6 gap-8">
            <div className="bg-slate-100 shadow rounded-xl overflow-hidden dark:bg-[#121212] w-full">
              <h1 className="text-2xl p-4 font-bold">Registered Category</h1>
              <div className="h-52 overflow-auto border-t">
                {
                  Categories == null ? (
                    <div className="flex h-52 w-full">
                      <div className="m-auto animate-spin duration-700 w-8 h-8 rounded-full p-1 spin-loader">
                        <span className="w-full h-full bg-slate-100 dark:bg-[#121212] inline-block rounded-full"></span>
                      </div>
                    </div>
                  ) : (Categories.map(c => {
                    return (
                      <div key={c._id} className="flex text-md p-4 gap-4 justify-between items-center border-b hover:bg-slate-50 dark:hover:bg-[#333333]">
                        <h1 className=" font-bold text-teal-600">{c.name}</h1>
                        <i className="fa fa-trash text-red-500 hover:text-red-700 cursor-pointer" onClick={() => delCategories(c._id)}></i>
                      </div>
                    )
                  })
                  )
                }
              </div>
            </div>

            <div className="bg-slate-100 shadow rounded-xl overflow-hidden dark:bg-[#121212] w-full">
              <h1 className="text-2xl p-4 font-bold ">Registered Admins</h1>
              <div className="h-52 overflow-auto border-t">
                {
                  Admins == null ? (
                    <div className="flex h-52 w-full">
                      <div className="m-auto animate-spin duration-700 w-8 h-8 rounded-full p-1 spin-loader">
                        <span className="w-full h-full bg-slate-100 dark:bg-[#121212] inline-block rounded-full"></span>
                      </div>
                    </div>
                  ) : (Admins.map(c => {
                    return (
                      <div key={c._id} className="flex text-md p-4 gap-4 justify-between items-center border-b hover:bg-slate-50 dark:hover:bg-[#333333]">
                        <h1 className=" font-bold text-teal-600">{c.name}</h1>
                        <i className="fa fa-trash text-red-500 hover:text-red-700 cursor-pointer" onClick={() => delAdmins(c._id)}></i>
                      </div>
                    )
                  })
                  )
                }
              </div>
            </div>
          </div>
        </div>

        {/* sidebar */}

        <div className="flex flex-col lg:w-[45%] w-full lg:mx-0 gap-8">

          <AdminField />

          <VisMissField />

          <ThesisesField />

          <FAQsField />

          <CategoryField />

          <div className="bg-white shadow rounded-xl overflow-hidden dark:bg-[#222222]">
            <h1 className="text-2xl p-4 font-bold">Registered Years</h1>
            <div className="h-52 overflow-auto border-t">
              {
                Year == null ? (
                  <div className="flex h-52 w-full">
                    <div className="m-auto animate-spin duration-700 w-8 h-8 rounded-full p-1 spin-loader">
                      <span className="w-full h-full bg-white dark:bg-[#222222] inline-block rounded-full"></span>
                    </div>
                  </div>
                ) : (Year.map(c => {
                  return (
                    <div key={c._id} className="flex text-md p-4 gap-4 justify-between items-center border-b hover:bg-slate-50 dark:hover:bg-[#333333]">
                      <h1 className=" font-bold text-teal-600">{c.year}</h1>
                      <i className="fa fa-trash text-red-500 hover:text-red-700 cursor-pointer" onClick={() => delyear(c._id)}></i>
                    </div>
                  )
                })
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;