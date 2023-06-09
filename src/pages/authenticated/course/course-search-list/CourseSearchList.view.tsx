import { PageHeader } from "../../../../components/ui/PageHeader/PageHeader";
import { useState } from "react";
import { useDebounce } from "../../../../utils/hooks/useDebounce";
import { RenderIf } from "../../../../components/conditionals/RenderIf";
import { Input } from "../../../../components/ui/Input/Input";
import { CourseContainerLoader } from "../_partials/CourseContainerLoader";
import { MapArray } from "../../../../components/conditionals/MapArray";
import { CourseModel } from "../../../../models/CourseModel";
import { Alert } from "../../../../components/ui/Alert/Alert";
import { COLOR_OPTS, TYPE_OPTS } from "../../../../assets/theme.config";
import { SearchCourseContainerPartial } from "./_partials/SearchCourseContainer.partial";
import CourseService from "../../../../services/course/CourseService";
import { useFilter } from "../../../../utils/hooks/useFilter";
import { fuzzySearch } from "../../../../utils/helper/fuzzysearch/FuzzySearchHelper";
import { Button } from "../../../../components/ui/Button/Button";
import { TbFilter } from "react-icons/all";
import { Card } from "../../../../components/ui/Card/Card";
import { Separator } from "../../../../components/ui/Separator/Separator";

type SearchFilter = {
    available_only: boolean;
};

const filterCourseFunction = (course: CourseModel, searchValue: string) => {
    return fuzzySearch(searchValue, [course.name]).length > 0;
};

export function CourseSearchListView() {
    const [searchFilter, setSearchFilter] = useState<SearchFilter>({ available_only: false });

    const [searchInput, setSearchInput] = useState<string>("");
    const debouncedInput = useDebounce(searchInput, 250);

    const { courses, loading: loadingCourses } = CourseService.getAvailableCourses();
    const filteredCourses = useFilter<CourseModel>(courses, searchInput, debouncedInput, filterCourseFunction);

    return (
        <>
            <PageHeader title={"Kurse Suchen"} hideBackLink />

            <RenderIf
                truthValue={!loadingCourses && searchInput.length == 0 && courses.length == 0}
                elementTrue={
                    <Alert rounded showIcon className={"my-0"} type={TYPE_OPTS.DANGER}>
                        Es gibt derzeit keine Kurse in die Du Dich einschreiben kannst. Kontaktiere einen Mentor, falls Du der Meinung bist, dass es sich hier
                        um einen Fehler handelt.
                    </Alert>
                }
                elementFalse={
                    <RenderIf
                        truthValue={!loadingCourses && courses.length > 0}
                        elementTrue={
                            <>
                                <Card>
                                    <div className={"flex w-full lg:flex-row flex-col justify-between"}>
                                        <Input
                                            value={searchInput}
                                            onChange={e => setSearchInput(e.target.value)}
                                            className={"mb-2 w-full"}
                                            label={"Kurse Filtern"}
                                            placeholder={courses?.length > 0 ? courses[0].name : "Frankfurt Tower Einweisung"}
                                        />

                                        <Button
                                            className={"lg:ml-2 mb-2 mt-auto h-[39px]"}
                                            variant={"twoTone"}
                                            icon={<TbFilter size={20} />}
                                            color={COLOR_OPTS.PRIMARY}>
                                            Filter Hinzufügen (TODO)
                                        </Button>
                                    </div>

                                    <p className={"mt-3"}>Die Suche ergab {filteredCourses.length} Treffer</p>
                                </Card>

                                <Separator className={"mt-6 mb-1"} />

                                <MapArray
                                    data={filteredCourses}
                                    mapFunction={(course: CourseModel, index) => {
                                        return <SearchCourseContainerPartial key={index} course={course} />;
                                    }}
                                />
                            </>
                        }
                        elementFalse={
                            <MapArray
                                data={Array(3).fill(0)}
                                mapFunction={(v, i) => {
                                    return <CourseContainerLoader key={i} />;
                                }}
                            />
                        }
                    />
                }
            />
        </>
    );
}
