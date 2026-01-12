"use client";

import { Trash, Upload, X } from "lucide-react";
import * as React from "react";
import { toast } from "sonner"
import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

const formSchema = z.object({
  files: z.array(z.instanceof(File)).min(1, "Conffffffff"),
});
type formValues = z.infer<typeof formSchema>;
export default function FileUploadDemo() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      files: [],
    },
  });

  const onSubmit = async (data: formValues) => {
    console.log(data)
    toast('A Sonner toast', {
          className: 'my-classname',
          description: 'With a description and an icon',
          duration: 5000,
          icon: <Trash />,
        });
    
  };

    const onFileReject = React.useCallback((file: File, message: string) => {
    toast(message, {
      description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
    });
  }, []);
  
  
      
  return (
    <div className="max-w-md mx-auto">
      <form method="post" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="files"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FileUpload
                  maxFiles={2}
                  maxSize={5 * 1024 * 1024}
                  className="w-full max-w-md"
                  value={field.value}
                  onValueChange= {field.onChange}
                  onFileReject={onFileReject}
                  multiple
                >
                  <FileUploadDropzone>
                    <div className="flex flex-col items-center gap-1 text-center">
                      <div className="flex items-center justify-center rounded-full border p-2.5">
                        <Upload className="size-6 text-muted-foreground" />
                      </div>
                      <p className="font-medium text-sm">
                        Drag & drop files here
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Or click to browse (max 2 files, up to 5MB each)
                      </p>
                    </div>
                    <FileUploadTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 w-fit"
                      >
                        Browse files
                      </Button>
                    </FileUploadTrigger>
                  </FileUploadDropzone>
                  <FileUploadList>
                    {field.value.map((file, index) => (
                      <FileUploadItem key={index} value={file}>
                        <FileUploadItemPreview />
                        <FileUploadItemMetadata />
                        <FileUploadItemDelete asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-7"
                          >
                            <X />
                          </Button>
                        </FileUploadItemDelete>
                      </FileUploadItem>
                    ))}
                  </FileUploadList>
                </FileUpload>
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="font-medium"
                  />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Button type="submit">Save</Button>
      </form>
    </div>
  );
}
