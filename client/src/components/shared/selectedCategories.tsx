"use client"
import React from 'react'
import { Label } from '../ui/label';
import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList, ComboboxValue } from '../ui/combobox';
import { FieldErrors, useForm, UseFormSetValue } from 'react-hook-form';
import { BookSchemaValues, CategoryData } from '@/app/admin/(home)/addProduct/page';


interface SelectedCategoriesProps {


    errors: FieldErrors<BookSchemaValues>
    selectedCategoriesId: string[]
    setSelectedCategoriesId: (categoriesId: string[]) => void
    setValue: UseFormSetValue<BookSchemaValues>
    categoriesState: CategoryData[]
}


const SelectedCategories = ({ errors, selectedCategoriesId, setSelectedCategoriesId, setValue, categoriesState }: SelectedCategoriesProps) => {

    console.log("categories state", categoriesState);

    const anchor = React.useRef<HTMLDivElement>(null);
    return (
        <div className='flex flex-col gap-2 mt-4'>
            <Label>Thể loại<span className='text-red-500'>*</span></Label>
            <Combobox
                multiple
                autoHighlight
                items={categoriesState.map((category: CategoryData) => category._id)}
                value={selectedCategoriesId}
                onValueChange={(values: string[]) => {
                    setSelectedCategoriesId(values);
                    setValue('categories', values, { shouldValidate: true });
                }}
            >
                <ComboboxChips ref={anchor} className="w-full max-w-xs">
                    <ComboboxValue>
                        {(values) => (
                            <React.Fragment>
                                {console.log("values", values)}

                                {values.map((id: string) => {
                                    const name = categoriesState.find((c) => c._id === id)?.name ?? id;
                                    return <ComboboxChip key={id}>{name}</ComboboxChip>;
                                })}
                                <ComboboxChipsInput key="combobox-chips-input" />
                            </React.Fragment>
                        )}
                    </ComboboxValue>
                </ComboboxChips>
                <ComboboxContent anchor={anchor}>
                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                    <ComboboxList>
                        {(item) => {
                            const name = categoriesState.find((c) => c._id === item)?.name ?? item;
                            return (
                                <ComboboxItem key={item} value={item}>
                                    {name}
                                </ComboboxItem>
                            )
                        }}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>
            <p className='text-red-500'>{errors.categories?.message}</p>
        </div>
    )
}

export default SelectedCategories