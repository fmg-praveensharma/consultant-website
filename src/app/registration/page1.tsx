"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormData } from "@/validation/validationSchema";
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
import { DatePicker } from "@/components/common/date-picker";
import { MultiSelect } from "@/components/ui/multi-select";
import { useRegisterUserMutation } from "@/store/services";
import { RegisterCredentials } from "@/types";
import { SampleDatePicker } from "@/components/common/SampleDatePicker";

export default function ApplicationForm() {
  const [registerUser, { isLoading, isError, error, isSuccess }] =
    useRegisterUserMutation();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: undefined,
      emailId: "",
      gender: "male",
      role: "astrologer",
      languages: [],
      maritalStatus: "",
      skills: [],
      categories: [],
      employed: "no",
      workingHours: "",
      description: "",
      services: "",
      fluteKnown: "friend",
      images: [],
    },
  });

  const role = form.watch("role");
  const currentlyEmployed = form.watch("employed");

  const handleSubmit = async (values: FormData) => {
    // Ensure skills and categories are always arrays
    const payload: RegisterCredentials = {
      first_name: values.firstName,
      last_name: values.lastName,
      date_of_birth: values.dateOfBirth,
      email_id: values.emailId,
      gender: values.gender,
      role: values.role,
      languages: values.languages,
      marital_status: values.maritalStatus,
      skills: values.skills ?? [], // Default to empty array if undefined
      categories: values.categories ?? [], // Default to empty array if undefined
      employed: values.employed,
      working_hours: parseInt(values.workingHours, 10),
      description: values.description,
      services: values.services,
      flute_known: values.fluteKnown,
      images: values.images,
    };

    try {
      const response = await registerUser(payload).unwrap();
      console.log("Registration successful:", response);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-[#F4F6FC]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-3xl w-full flex flex-col gap-4 bg-white p-6 rounded-md shadow-md"
        >
          {/* First Name and Last Name */}
          <div className="flex flex-col gap-4 md:flex-row md:gap-8">
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

          {/* Date of Birth and Email */}
          <div className="flex flex-col gap-4 md:flex-row md:gap-8">
            {/* <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <DatePicker value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    {/* Use SampleDatePicker and connect it to the form field */}
                    <SampleDatePicker
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emailId"
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

          {/* Gender and Marital Status */}
          <div className="flex flex-col gap-4 md:flex-row md:gap-8">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <div className="flex space-x-4">
                      <RadioGroupItem value="male" id="male" />
                      <label htmlFor="male">Male</label>
                      <RadioGroupItem value="female" id="female" />
                      <label htmlFor="female">Female</label>
                      <RadioGroupItem value="others" id="others" />
                      <label htmlFor="others">Others</label>
                    </div>
                  </RadioGroup>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maritalStatus"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Marital Status</FormLabel>
                  <Select onValueChange={field.onChange}>
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

          {/* Languages */}
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
                    field.onChange(selected.map((option: any) => option.value))
                  }
                  placeholder="Select languages"
                  name={""}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Choose Your Role */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Choose Your Role</FormLabel>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <div className="flex space-x-4">
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

          {/* Skills and Categories (Conditional) */}
          {role === "astrologer" && (
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills</FormLabel>
                  <MultiSelect
                    options={[
                      { value: "tarot", label: "Tarot Reading" },
                      { value: "numerology", label: "Numerology" },
                      // Add more skill options as needed
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
                    placeholder="Select skills"
                    name={""}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {role === "coach" && (
            <>
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills</FormLabel>
                    <MultiSelect
                      options={[
                        { value: "leadership", label: "Leadership" },
                        { value: "communication", label: "Communication" },
                        // Add more skill options as needed
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
                      placeholder="Select skills"
                      name={""}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categories</FormLabel>
                    <MultiSelect
                      options={[
                        { value: "career", label: "Career" },
                        { value: "personal", label: "Personal" },
                        // Add more category options as needed
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
                      placeholder="Select categories"
                      name={""}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {/* Employment Details */}
          <FormField
            control={form.control}
            name="employed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Are you currently employed?</FormLabel>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <div className="flex space-x-4">
                    <RadioGroupItem value="yes" id="employed-yes" />
                    <label htmlFor="employed-yes">Yes</label>
                    <RadioGroupItem value="no" id="employed-no" />
                    <label htmlFor="employed-no">No</label>
                  </div>
                </RadioGroup>
                <FormMessage />
              </FormItem>
            )}
          />
          {currentlyEmployed === "yes" && (
            <FormField
              control={form.control}
              name="workingHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Working Hours</FormLabel>
                  <Input placeholder="Enter working hours" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Tell us more about yourself"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Services */}
          <FormField
            control={form.control}
            name="services"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Services Offered</FormLabel>
                <Textarea
                  placeholder="Describe the services you offer"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Flute Known */}
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

          {/* Image Upload */}
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Images</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                      const fileArray = Array.from(files);
                      field.onChange(fileArray);
                    }
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="mt-4">
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
}
