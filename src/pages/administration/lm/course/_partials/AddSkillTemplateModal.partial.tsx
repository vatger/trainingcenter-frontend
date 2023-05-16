import {Modal} from "../../../../../components/ui/Modal/Modal";
import {Input} from "../../../../../components/ui/Input/Input";
import {TbSearch} from "react-icons/all";
import {useState} from "react";
import {useDebounce} from "../../../../../utils/hooks/useDebounce";
import {MapArray} from "../../../../../components/conditionals/MapArray";
import {RenderIf} from "../../../../../components/conditionals/RenderIf";
import {Separator} from "../../../../../components/ui/Separator/Separator";
import CourseService from "../../../../../services/course/Course.admin.service";
import {CourseSkillTemplateModel} from "../../../../../models/Course.model";
import {useFilter} from "../../../../../utils/hooks/useFilter";
import {fuzzySearch} from "../../../../../utils/helper/fuzzysearch/FuzzySearchHelper";

const filterCourseSkillTemplateFunction = (logTemplate: CourseSkillTemplateModel, searchValue: string) => {
    return fuzzySearch(searchValue, [logTemplate.name]).length > 0;
};

export function AddSkillTypeModalPartial(props: { open: boolean; onClose: () => any; onSelect: (courseSkill: CourseSkillTemplateModel) => any }) {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const debouncedValue = useDebounce<string>(searchQuery, 300);

    const { skillTemplates, loading, loadingError } = CourseService.getSkillTemplates();
    const filteredSkillTemplates = useFilter<CourseSkillTemplateModel>(skillTemplates, searchQuery, debouncedValue, filterCourseSkillTemplateFunction, true);

    return (
        <Modal show={props.open} onClose={props.onClose} title={"Skillvorlagen Suchen"}>
            <Input
                className={"mb-3"}
                type={"text"}
                value={searchQuery}
                loading={loading}
                onChange={e => setSearchQuery(e.target.value)}
                preIcon={<TbSearch size={20} />}
                placeholder={"Langen Radar"}
            />

            <RenderIf
                truthValue={filteredSkillTemplates.length > 0}
                elementTrue={
                    <>
                        <span>
                            Die Suche ergab <strong>{filteredSkillTemplates.length}</strong> Treffer.
                        </span>

                        <Separator className={"mt-1"} />
                    </>
                }
            />

            <div className={"max-h-[35vh] side-nav-hide-scrollbar overflow-y-auto"}>
                <MapArray
                    data={filteredSkillTemplates}
                    mapFunction={(value: CourseSkillTemplateModel, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => props.onSelect?.(value)}
                                className={
                                    "flex mt-2 justify-between flex-row rounded border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500 transition-all border hover:shadow-sm p-3 cursor-pointer"
                                }>
                                <span className={"flex"}>{`${value.name} - #${value.id}`} </span>
                            </div>
                        );
                    }}
                />
            </div>
        </Modal>
    );
}
