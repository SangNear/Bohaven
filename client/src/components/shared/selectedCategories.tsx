"use client"
import React from 'react'
import { Label } from '../ui/label';
import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList, ComboboxValue } from '../ui/combobox';
import { FieldErrors, useForm, UseFormSetValue } from 'react-hook-form';
import { BookSchemaValues } from '@/app/admin/(home)/addProduct/page';

interface SelectedCategoriesProps {

    categories: string[]
    errors: FieldErrors<BookSchemaValues>
    selectedCategories: string[]
    setSelectedCategories: (categories: string[]) => void
    setValue: UseFormSetValue<BookSchemaValues>
}

const SelectedCategories = ({ categories, errors, selectedCategories, setSelectedCategories, setValue }: SelectedCategoriesProps) => {


    const anchor = React.useRef<HTMLDivElement>(null);
    return (
        <div className='flex flex-col gap-2 mt-4'>
            <Label>Thể loại<span className='text-red-500'>*</span></Label>
            <Combobox
                multiple
                autoHighlight
                items={categories}
                value={selectedCategories}
                onValueChange={(values: string[]) => {
                    setSelectedCategories(values);
                    setValue('categories', values, { shouldValidate: true });
                }}
            >
                <ComboboxChips ref={anchor} className="w-full max-w-xs">
                    <ComboboxValue>
                        {(values) => (
                            <React.Fragment>
                                {values.map((value: string) => (
                                    <ComboboxChip key={value}>{value}</ComboboxChip>
                                ))}
                                <ComboboxChipsInput />
                            </React.Fragment>
                        )}
                    </ComboboxValue>
                </ComboboxChips>
                <ComboboxContent anchor={anchor}>
                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                    <ComboboxList>
                        {(item) => (
                            <ComboboxItem key={item} value={item}>
                                {item}
                            </ComboboxItem>
                        )}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>
            <p className='text-red-500'>{errors.categories?.message}</p>
        </div>
    )
}

export default SelectedCategories