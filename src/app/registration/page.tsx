"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormData } from "@/validation/validationSchema";
import { motion, AnimatePresence } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { RegisterCredentials } from "@/types";
import {
  useGetCategoriesListQuery,
  useGetSkillsListQuery,
  useCreateConsultantRegisterMutation,
} from "@/store/services";
import { MultiSelect } from "@/components/ui/multi-select";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RegistrationModal from "./success/page";

// import { SampleDatePicker } from "@/components/common/SampleDatePicker";

export default function ApplicationForm() {
  const router = useRouter();
  const [registerUser, { isLoading, isError, error, isSuccess }] =
    useCreateConsultantRegisterMutation();

  const [registrationModal, setRegistrationModal] = useState(false);

  const { data: skillsList } = useGetSkillsListQuery({});
  const { data: categoriesList } = useGetCategoriesListQuery({});

  const skillOptions =
    skillsList?.data.map((skill, index) => ({
      value: (index + 1).toString(),
      label: skill.skill_name,
    })) || [];

  const toggleRegistrationModal = () => {
    setRegistrationModal(!registrationModal);
  };

  const categoriesOptions =
    categoriesList?.data.map((category, index) => ({
      value: (index + 1).toString(),
      label: category.name,
    })) || [];

  const formatDateToMMDDYYYY = (date: Date | string): string => {
    // If the input is a string, convert it to a Date object
    const dateObject = typeof date === "string" ? new Date(date) : date;
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
    const year = dateObject.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: 1,
      email: "",
      dateOfBirth: formatDateToMMDDYYYY(new Date()),
      maritalStatus: 1,
      languages: [],
      role: 3,
      skills: [],
      categories: [],
      fluteKnown: "",
    },
  });

  const { setValue } = form;

  const role = form.watch("role");

  const handleSubmit = async (values: FormData) => {
    const dateOfBirth =
      typeof values.dateOfBirth === "string"
        ? new Date(values.dateOfBirth)
        : values.dateOfBirth;
    const formattedDateOfBirth = formatDateToMMDDYYYY(values.dateOfBirth);

    const payload: RegisterCredentials = {
      first_name: values.firstName,
      last_name: values.lastName,
      gender: values.gender,
      email: values.email,
      date_of_birth: formattedDateOfBirth,
      marital_status: values.maritalStatus,
      languages: values.languages,
      consultant_type: values.role,
      skills: values.skills ?? [],
      categories: values.categories ?? [],
      from_where_did_you_learn_flute: values.fluteKnown,
    };

    console.log("form data", payload);

    try {
      const result = await registerUser(payload).unwrap();

      // toggleRegistrationModal();
      // router.push("/success");

      console.log("User registered successfully:", result);
    } catch (error) {
      console.error("Failed to register user:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6 bg-[#F4F6FC]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full max-w-4xl bg-white p-8 rounded-md shadow-md"
        >
          {/* First Name and Last Name */}
          <div className="flex flex-col gap-6 md:flex-row md:gap-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* ****************************************************** Date of Birth and Email *****************************************************/}
          <div className="flex flex-col gap-6 md:flex-row md:gap-8">
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <input
                      type="date"
                      className="p-1 border rounded-[4px] w-full"
                      {...field} // Bind field to input
                      value={
                        field.value
                          ? new Date(field.value).toISOString().split("T")[0]
                          : ""
                      } // Convert Date to "YYYY-MM-DD"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Email Id</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* ************************************************************** Gender **************************************************************/}
          <div className="flex flex-col gap-4 mb-4">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        // Map string values to corresponding numbers
                        const mappedValue =
                          value === "male" ? 1 : value === "female" ? 2 : 3;
                        field.onChange(mappedValue); // Pass the mapped value to the form control
                      }}
                      value={
                        field.value === 1
                          ? "male"
                          : field.value === 2
                          ? "female"
                          : "others"
                      } // Convert number back to string for rendering
                    >
                      <div className="flex space-x-4 justify-start items-center">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <label htmlFor="male">Male</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                          <label htmlFor="female">Female</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="others" id="others" />
                          <label htmlFor="others">Others</label>
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ****************************************************** Marital Status Field **************************************************************/}
            <FormField
              control={form.control}
              name="maritalStatus"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Marital Status</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      // Map string values to corresponding numbers
                      const mappedValue =
                        value === "single"
                          ? 1
                          : value === "married"
                          ? 2
                          : value === "divorced"
                          ? 3
                          : 4;
                      field.onChange(mappedValue); // Pass the mapped value to the form control
                    }}
                    value={
                      field.value === 1
                        ? "single"
                        : field.value === 2
                        ? "married"
                        : field.value === 3
                        ? "divorced"
                        : "widowed"
                    } // Convert number back to string for rendering
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select marital status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/*  *************************************************************Languages ******************************************************************/}
          <div className="mb-4">
            <FormField
              control={form.control}
              name="languages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Languages</FormLabel>
                  <MultiSelect
                    options={[
                      { value: "english", label: "English" },
                      { value: "spanish", label: "Spanish" },
                      // Add more language options as needed
                    ]}
                    value={
                      field.value?.map((val: string) => ({
                        value: val,
                        label: val,
                      })) || []
                    }
                    onChange={(selected: any) =>
                      field.onChange(
                        selected.map((option: any) => option.value)
                      )
                    }
                    placeholder="Select languages"
                    name={""}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* **************************************************************Choose Your Role ***************************************************************/}
          <div className="mb-4">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choose Your Role</FormLabel>
                  <RadioGroup
                    onValueChange={(value) => {
                      // Map string values to corresponding numbers
                      const mappedValue =
                        value === "astrologer" ? 1 : value === "coach" ? 2 : 3;
                      field.onChange(mappedValue); // Pass the mapped value to the form control

                      // Reset the values of 'skills' and 'categories' when 'role' changes
                      form.setValue("skills", []);
                      form.setValue("categories", []);
                    }}
                    value={
                      field.value === 1
                        ? "astrologer"
                        : field.value === 2
                        ? "coach"
                        : "listener"
                    } // Convert number back to string for rendering
                  >
                    <div className="flex space-x-4 justify-start items-center">
                      <RadioGroupItem value="astrologer" id="astrologer" />
                      <label htmlFor="astrologer">Astrologer</label>
                      <RadioGroupItem value="coach" id="coach" />
                      <label htmlFor="coach">Coach</label>
                      <RadioGroupItem value="listener" id="listener" />
                      <label htmlFor="listener">Listener</label>
                    </div>
                  </RadioGroup>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ****************************************************************Animate the fields *******************************************************/}
            <AnimatePresence>
              {role === 1 && (
                <motion.div
                  key="skills-field-astrologer"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => {
                      const [error, setError] = useState<string | null>(null); // State for error message

                      const selectedOptions =
                        field.value?.map((id: number) => ({
                          value: id.toString(),
                          label:
                            skillOptions.find(
                              (option) => option.value === id.toString()
                            )?.label || "",
                        })) || [];

                      const handleSkillsChange = (selected: any) => {
                        if (selected.length > 3) {
                          setError("You can select a maximum of 3 skills.");
                        } else {
                          setError(null); // Clear error message
                          field.onChange(
                            selected.map((option: any) => Number(option.value))
                          );
                        }
                      };

                      return (
                        <FormItem>
                          <FormLabel>Skills</FormLabel>
                          <MultiSelect
                            options={skillOptions}
                            value={selectedOptions}
                            onChange={handleSkillsChange}
                            placeholder="Select skills (up to 3)"
                            name="skills"
                          />
                          {error && (
                            <div className="error-message text-orange-500">
                              {error}
                            </div>
                          )}
                          {/* Display error message */}
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </motion.div>
              )}

              {role === 2 && (
                <motion.div
                  key="fields-coach"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => {
                      const [error, setError] = useState<string | null>(null); // State for error message

                      const selectedOptions =
                        field.value?.map((id: number) => ({
                          value: id.toString(),
                          label:
                            skillOptions.find(
                              (option) => option.value === id.toString()
                            )?.label || "",
                        })) || [];

                      const handleSkillsChange = (selected: any) => {
                        if (selected.length > 3) {
                          setError("You can select a maximum of 3 skills.");
                        } else {
                          setError(null); // Clear error message
                          field.onChange(
                            selected.map((option: any) => Number(option.value))
                          );
                        }
                      };

                      return (
                        <FormItem>
                          <FormLabel>Skills</FormLabel>
                          <MultiSelect
                            options={skillOptions}
                            value={selectedOptions}
                            onChange={handleSkillsChange}
                            placeholder="Select skills (up to 3)"
                            name="skills"
                          />
                          {error && (
                            <div className="error-message text-orange-500">
                              {error}
                            </div>
                          )}{" "}
                          {/* Display error message */}
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <FormField
                    control={form.control}
                    name="categories"
                    render={({ field }) => {
                      const [error, setError] = useState<string | null>(null); // State for error message

                      const selectedOptions =
                        field.value?.map((id: number) => ({
                          value: id.toString(),
                          label:
                            categoriesOptions.find(
                              (option) => option.value === id.toString()
                            )?.label || "",
                        })) || [];

                      const handleCategoriesChange = (selected: any) => {
                        if (selected.length > 3) {
                          setError("You can select a maximum of 3 categories.");
                        } else {
                          setError(null); // Clear error message
                          field.onChange(
                            selected.map((option: any) => Number(option.value))
                          );
                        }
                      };

                      return (
                        <FormItem>
                          <FormLabel>Categories</FormLabel>
                          <MultiSelect
                            options={categoriesOptions}
                            value={selectedOptions}
                            onChange={handleCategoriesChange}
                            placeholder="Select categories (up to 3)"
                            name="categories"
                          />
                          {error && (
                            <div className="error-message text-orange-500">
                              {error}
                            </div>
                          )}{" "}
                          {/* Display error message */}
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ****************************************************** Flute Known **************************************************************/}
          <FormField
            control={form.control}
            name="fluteKnown"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How did you know about us?</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="friend">Friend</SelectItem>
                    <SelectItem value="advertisement">Advertisement</SelectItem>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="socialMedia">Social Media</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ********************************************************Submit Button ***********************************************************/}
          <Button
            type="submit"
            className="mt-6 w-full bg-blue-500 text-white hover:bg-blue-600"
            // onClick={() => router.push("/registration/success")}
          >
            Submit
          </Button>
        </form>
      </Form>

      {registrationModal && (
        <RegistrationModal
          isOpen={registrationModal}
          onClose={toggleRegistrationModal}
        />
      )}
    </main>
  );
}
